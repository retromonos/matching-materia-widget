//Commenting out because we are bulding CARDS directly in this file
//import { populateTable } from './scoreTableComponents.js';

// Hide default system table
Materia.ScoreCore.hideResultsTable();

const cardListElement = document.getElementById('score-card-list');
const template = document.getElementById('card-template');

const screenReaderTbodyElement = document.getElementById('screenReaderTbody');
const message = document.getElementById('message');


const start = (instance, qset, scoreTable, isPreview, qsetVersion) => {
	update(qset, scoreTable)
}

// calculates height so the widget fits
const getRenderedHeight = () => {
    return Math.ceil(parseFloat(window.getComputedStyle(document.querySelector('html')).height)) + 10
}

const update = (qset, scoreTable) => {
	console.log("qset is:", qset);
	console.log("scoreTable is:", scoreTable); // should include .data array

	//check if instructor hid answers
	const showAnswers = qset && qset.options ? !qset.options.hide_correct : true;


	// erase old cards
	if (cardListElement) {
		cardListElement.innerHTML = '';
	}

	if (scoreTable && scoreTable.length > 0) {
		scoreTable.forEach((row, index) => {
			const termText = row.data[0]; 
            const userResponse = row.data[1]; 
            const correctAnswer = showAnswers ? row.data[2] : "Hidden"; 
            const isCorrect = row.score === 100;

            const clone = template.content.cloneNode(true);
            
            const rowContainer = clone.querySelector('.match-row');

            const pairLabel = clone.querySelector('.pair-label');
            const termPill = clone.querySelector('.term-pill');
            const userPill = clone.querySelector('.user-pill');
            const iconBadge = clone.querySelector('.icon-badge');
        

            const correctionContainer = clone.querySelector('.correction-container');
            const correctPill = clone.querySelector('.correct-pill');

            pairLabel.textContent = `PAIR ${index + 1}`;
            termPill.textContent = termText || "Term";
            userPill.textContent = userResponse || "No Match";
            correctPill.textContent = correctAnswer;

            
            if (isCorrect) {
                rowContainer.classList.add('state-correct');
                iconBadge.textContent = '✓';
    
                correctionContainer.style.display = 'none';
            } else {
                rowContainer.classList.add('state-incorrect');
                iconBadge.textContent = '✕';
                
                if (showAnswers) {
                    correctionContainer.style.display = 'flex';
                }
            }

            cardListElement.appendChild(clone); 
        });
    }

    const h = getRenderedHeight();
    Materia.ScoreCore.setHeight(h);
}

Materia.ScoreCore.start({
    start: start,
    update: update,
    handleScoreDistribution: (distribution) => {},
});