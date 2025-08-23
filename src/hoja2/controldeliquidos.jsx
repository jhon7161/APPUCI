import React, { useEffect, useMemo, useCallback } from "react";
import { HORAS, initHoja2, toNum, nuevaColAdmin, nuevaColElim } from "./componenteshoja2/helpers";
import Hoja2Table from "./componenteshoja2/Hoja2Table";
import Hoja2Balances from "./componenteshoja2/Hoja2Balances";
import AuxiliaresEnfermeria from "./componenteshoja2/AuxiliaresEnfermeria";

const ComponenteHoja2 = ({ form, setForm }) => {
  useEffect(() => {
    if (!form.hoja2) setForm((prev) => ({ ...prev, hoja2: initHoja2() }));
  }, [form.hoja2, setForm]);

  if (!form.hoja2) return null;
  const { administrados, eliminados } = form.hoja2;

  const setHoja2 = (updater) =>
    setForm((prev) => ({ ...prev, hoja2: updater(prev.hoja2) }));

  const updateArrayItem = useCallback((arr, idx, updater) =>
    arr.map((item, i) => (i === idx ? updater(item) : item)), []);

  // handlers
  const cambiarNombreAdmin = (i, nombre) =>
    setHoja2((prev) => ({ ...prev, administrados: updateArrayItem(prev.administrados, i, (c) => ({ ...c, nombre })) }));
  const cambiarDosisAdmin = (i, h, val) =>
    setHoja2((prev) => ({ ...prev, administrados: updateArrayItem(prev.administrados, i, (c) => ({ ...c, dosis: updateArrayItem(c.dosis, h, () => val) })) }));
  const agregarMedicamento = () =>
    setHoja2((prev) => ({ ...prev, administrados: [...prev.administrados, nuevaColAdmin()] }));

  const cambiarDiuresisHora = (h, val) =>
    setHoja2((prev) => ({ ...prev, eliminados: { ...prev.eliminados, diuresisHora: updateArrayItem(prev.eliminados.diuresisHora, h, () => val) } }));
  const cambiarNombreOtroElim = (i, nombre) =>
    setHoja2((prev) => ({ ...prev, eliminados: { ...prev.eliminados, otros: updateArrayItem(prev.eliminados.otros, i, (c) => ({ ...c, nombre })) } }));
  const cambiarValorOtroElim = (i, h, val) =>
    setHoja2((prev) => ({ ...prev, eliminados: { ...prev.eliminados, otros: updateArrayItem(prev.eliminados.otros, i, (c) => ({ ...c, valores: updateArrayItem(c.valores, h, () => val) })) } }));
  const agregarEliminado = () =>
    setHoja2((prev) => ({ ...prev, eliminados: { ...prev.eliminados, otros: [...prev.eliminados.otros, nuevaColElim()] } }));

  // cálculos (igual que tu código original)
  const totalAdminHora = useMemo(() => HORAS.map((_, h) => administrados.reduce((s, col) => s + toNum(col.dosis[h]), 0)), [administrados]);
  const acumAdmin = useMemo(() => { let acc = 0; return totalAdminHora.map((t) => (acc += t)); }, [totalAdminHora]);
  const diuresisHora = eliminados.diuresisHora;
  const diuresisAcum = useMemo(() => { let acc = 0; return HORAS.map((_, h) => (acc += toNum(diuresisHora[h]))); }, [diuresisHora]);
  const totalOtrosElimHora = useMemo(() => HORAS.map((_, h) => (eliminados.otros || []).reduce((s, col) => s + toNum(col.valores[h]), 0)), [eliminados.otros]);
  const totalElimHora = useMemo(() => HORAS.map((_, h) => toNum(diuresisHora[h]) + totalOtrosElimHora[h]), [diuresisHora, totalOtrosElimHora]);
  const acumElim = useMemo(() => { let acc = 0; return totalElimHora.map((t) => (acc += t)); }, [totalElimHora]);
  const balanceAcum = useMemo(() => HORAS.map((_, h) => toNum(acumAdmin[h]) - toNum(acumElim[h])), [acumAdmin, acumElim]);
  const gu24h = useMemo(() => { const peso = toNum(form.peso) || 1; const totalOrina24h = diuresisAcum.at(-1) || 0; return (totalOrina24h / peso / 24).toFixed(2); }, [diuresisAcum, form.peso]);
  const guPorHora = useMemo(() => { const peso = toNum(form.peso) || 1; const da13 = diuresisAcum[HORAS.indexOf("13:00")] || 0; const da19 = diuresisAcum[HORAS.indexOf("19:00")] || 0; const da06 = diuresisAcum[HORAS.indexOf("06:00")] || 0; return HORAS.map((hora) => { if (hora === "13:00") return (da13 / peso / 7).toFixed(2); if (hora === "19:00") return ((da19 - da13) / peso / 6).toFixed(2); if (hora === "06:00") return ((da06 - da19) / peso / 12).toFixed(2); return ""; }); }, [diuresisAcum, form.peso]);
  const totales24h = useMemo(() => { const totalAdm = acumAdmin.at(-1) || 0; const totalElim = acumElim.at(-1) || 0; const previo = form.hoja2.balances?.previo || 0; const balanceDia = totalAdm - totalElim; const balanceAcum24 = previo + balanceDia; return { totalAdm, totalElim, previo, balanceDia, balanceAcum24 }; }, [acumAdmin, acumElim, form.hoja2.balances]);

  return (
    <div style={{ overflowX: "auto", padding: 8 }}>
      <h3 style={{ margin: "6px 0", textAlign: "center" }}>💧 Control de Líquidos (07:00 → 06:00)</h3>

      <Hoja2Table
    className="hoja2-table"
    administrados={administrados}
    eliminados={eliminados}
    totalAdminHora={totalAdminHora}
    acumAdmin={acumAdmin}
    diuresisHora={diuresisHora}
    diuresisAcum={diuresisAcum}
    totalElimHora={totalElimHora}
    acumElim={acumElim}
    balanceAcum={balanceAcum}
    guPorHora={guPorHora}
    onNombreAdmin={cambiarNombreAdmin}
    onDosisAdmin={cambiarDosisAdmin}
    onDiuresisHora={cambiarDiuresisHora}
    onNombreElim={cambiarNombreOtroElim}
    onValorElim={cambiarValorOtroElim}
  />

  <div className="hoja2-buttons">
    <button type="button" onClick={agregarMedicamento}>➕ Agregar Medicamento</button>
    <button type="button" onClick={agregarEliminado}>➕ Agregar Eliminación</button>
  </div>

  <Hoja2Balances totales24h={totales24h} gu24h={gu24h} />
  <AuxiliaresEnfermeria form={form} setForm={setForm} />
</div>
  );
};

export default ComponenteHoja2;
