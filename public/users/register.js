// /public/js/js.js

const societySelectElement = document.getElementById('society');
const towerContainerElement = document.getElementById('towerContainer');
const flatContainerElement = document.getElementById('flatContainer');

societySelectElement.addEventListener('change', event => {
	towerContainerElement.innerHTML = '';
	flatContainerElement.innerHTML = '';
	
	const towerData = { CHD: [], JMD: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'] };
	for(let i=0; i<18; i++) {
		towerData.CHD[i] = `T${i+1}`;
	}
	const flatData = { CHD: [], JMD: [] };
	let k=0;
	for(let i=0; i<13; i++) {
		for(let j=1; j<7; j++) {
			flatData.CHD[k] = `${i}0${j}`;
			k++;
		}
	}
	k=0;
	for(let i=1; i<19; i++) {
		for(let j=1; j<3; j++) {
			flatData.JMD[k] = `${i}0${j}`;
			k++;
		}
	}
	
	const choice = event.target.value;
	
	const towerLabelElement = document.createElement('label');
	towerLabelElement.for = 'tower';
	towerLabelElement.textContent = 'Tower: ';
	const towerSelectElement = document.createElement('select');
	towerSelectElement.id = 'tower';
	towerSelectElement.name = 'tower';
	towerSelectElement.required = true;
	let defOpt = document.createElement('option');
	defOpt.value = '';
	defOpt.hidden = true;
	defOpt.disabled = true;
	defOpt.selected = true;
	defOpt.textContent = '--Choose Tower--';
	towerSelectElement.appendChild(defOpt);
	towerData[choice].forEach(item => {
		const optionElement = document.createElement('option');
		optionElement.value = item;
		optionElement.textContent = item;
		towerSelectElement.appendChild(optionElement);
	});
	towerContainerElement.appendChild(towerLabelElement);
	towerContainerElement.appendChild(towerSelectElement);
	
	const flatLabelElement = document.createElement('label');
	flatLabelElement.for = 'flat';
	flatLabelElement.textContent = 'Flat: ';
	const flatSelectElement = document.createElement('select');
	flatSelectElement.id = 'flat';
	flatSelectElement.name = 'flat';
	flatSelectElement.required = true;
	defOpt = document.createElement('option');
	defOpt.value = '';
	defOpt.hidden = true;
	defOpt.disable = true;
	defOpt.selected = true;
	defOpt.textContent = '--Choose Flat--';
	flatSelectElement.appendChild(defOpt);
	flatData[choice].forEach(item => {
		const optionElement = document.createElement('option');
		optionElement.value = item;
		optionElement.textContent = item;
		flatSelectElement.appendChild(optionElement);
	});
	flatContainerElement.appendChild(flatLabelElement);
	flatContainerElement.appendChild(flatSelectElement);
});

