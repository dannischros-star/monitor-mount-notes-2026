/** Dated manufacturer-spec filter, not a safety certification. */
export function evaluateDeskFit({weight, vesa, thickness}) {
  const load = typeof weight === 'number' ? weight : (typeof weight === 'string' && weight.trim() ? Number(weight) : NaN);
  const desk = typeof thickness === 'number' ? thickness : (typeof thickness === 'string' && thickness.trim() ? Number(thickness) : NaN);
  if (!Number.isFinite(load) || load <= 0 || !Number.isFinite(desk) || desk <= 0 || !['75', '100', 'other'].includes(vesa)) {
    return {error: 'Enter a positive, finite monitor load and desk thickness, and select a VESA pattern.', results: []};
  }
  const shared = ['Desk material, clamp clearance, fasteners, screen size and screen depth are not established by these inputs. Read the exact manuals before installation.'];
  const make = (name, maxLoad, minLoad, maxDesk) => {
    const failures = [], notes = [...shared];
    if (load > maxLoad) failures.push('Load exceeds the published ' + maxLoad + ' lb maximum.');
    if (minLoad !== null && load < minLoad) failures.push('Load is below the published ' + minLoad + ' lb minimum.');
    if (desk > maxDesk) failures.push('Desk thickness exceeds the published ' + maxDesk + ' in maximum.');
    if (vesa === 'other') failures.push('The mounting pattern is not verified as 75 × 75 or 100 × 100 mm; no adapter compatibility is assumed.');
    if (minLoad === null) {
      notes.push('VIVO’s cited product page does not establish a minimum clamp thickness or minimum monitor load. Both remain unresolved; a numerical in-range result is not a full fit finding.');
    } else {
      if (desk < 0.4) notes.push('Desk is below our conservative 0.4 in nominal lower boundary. The manual depicts a separate thin-surface configuration; ask Ergotron about the exact setup.');
      if ((desk > 0.4 && desk < 0.47) || (desk > 1.38 && desk < 1.46)) notes.push('Thickness falls between illustrated clamp configurations. Confirm the actual metric measurement and clamp position with Ergotron; do not assume the gap is compatible.');
      notes.push('Verify the exact LX clamp position against manual page 4. The nominal 0.4–2.4 in span is not a promise of continuous fit.');
      if (load > 20) notes.push('Above 20 lb, Ergotron says the lower lift range can be reduced by up to 4.5 in.');
      notes.push('Monitor depth above 2.5 in may diminish capacity; the tool does not measure screen depth.');
    }
    const clampReview = minLoad !== null && (desk < 0.4 || (desk > 0.4 && desk < 0.47) || (desk > 1.38 && desk < 1.46));
    const status = failures.length ? 'outside' : clampReview ? 'review' : 'within';
    return {name,status,label: status === 'outside' ? 'Outside a checked limit / mounting pattern unverified' : status === 'review' ? 'Clamp configuration needs manufacturer review' : 'Within the checked numerical limits; manual review required',failures,notes};
  };
  return {error:null,results:[make('VIVO STAND-V001',22,null,3.25),make('Ergotron LX 45-241-224',25,7,2.4)]};
}
