import {evaluateDeskFit} from './checker.mjs';
const form = document.querySelector('#fit-form');
const output = document.querySelector('#fit-results');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const report = evaluateDeskFit({weight:data.get('weight'),vesa:data.get('vesa'),thickness:data.get('thickness')});
  output.replaceChildren();
  if (report.error) {const p=document.createElement('p');p.className='result-error';p.textContent=report.error;output.append(p);return;}
  const heading=document.createElement('h3');heading.textContent='Your preliminary check';output.append(heading);
  for (const result of report.results) {
    const card=document.createElement('div');card.className='result-card '+result.status;
    const name=document.createElement('h4');name.textContent=result.name;card.append(name);
    const status=document.createElement('p');status.className='result-status';status.textContent=result.label;card.append(status);
    const list=document.createElement('ul');
    for(const detail of [...result.failures,...result.notes]){const item=document.createElement('li');item.textContent=detail;list.append(item);}
    card.append(list);output.append(card);
  }
});
