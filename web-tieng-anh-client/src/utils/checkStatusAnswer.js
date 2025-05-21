


const checkStatusAnswer = (answers) => {
    const status = [];

    const answers_part1 = answers.filter(answer => answer.stt <= 6);
    const answers_part2 = answers.filter(answer => answer.stt > 6 && answer.stt <= 31);
    const answers_part3 = answers.filter(answer => answer.stt > 31 && answer.stt <= 70);
    const answers_part4 = answers.filter(answer => answer.stt > 70 && answer.stt <= 100);
    const answers_part5 = answers.filter(answer => answer.stt > 100 && answer.stt <= 130);
    const answers_part6 = answers.filter(answer => answer.stt > 130 && answer.stt <= 146);
    const answers_part7 = answers.filter(answer => answer.stt > 146 && answer.stt <= 200);

    checkAnswerPart(answers_part1, status);
    checkAnswerPart(answers_part2, status);
    checkAnswerPart(answers_part3, status);
    checkAnswerPart(answers_part4, status);
    checkAnswerPart(answers_part5, status);
    checkAnswerPart(answers_part6, status);
    checkAnswerPart(answers_part7, status);

    return status;
}


function checkSelectedAnswer(answers) {
    const selected = [];

    const answers_part1 = answers.filter(answer => answer.stt <= 6);
    const answers_part2 = answers.filter(answer => answer.stt > 6 && answer.stt <= 31);
    const answers_part3 = answers.filter(answer => answer.stt > 31 && answer.stt <= 70);
    const answers_part4 = answers.filter(answer => answer.stt > 70 && answer.stt <= 100);
    const answers_part5 = answers.filter(answer => answer.stt > 100 && answer.stt <= 130);
    const answers_part6 = answers.filter(answer => answer.stt > 130 && answer.stt <= 146);
    const answers_part7 = answers.filter(answer => answer.stt > 146 && answer.stt <= 200);

    checkSelected(answers_part1, selected);
    checkSelected(answers_part2, selected);
    checkSelected(answers_part3, selected);
    checkSelected(answers_part4, selected);
    checkSelected(answers_part5, selected);
    checkSelected(answers_part6, selected);
    checkSelected(answers_part7, selected);

    return selected;


}


function checkSelected(part, selected) {
    let flag = 0;
    part.forEach(element => {
        if (element.status === 'selected') {
            flag += 1;
        }

    });
    selected.push(`${flag}/${part.length}`);
}


function checkAnswerPart(answers_part, status) {
    let flag = 0;
    let subStatus = "Complete";
    answers_part.forEach(answer => {
        if (answer.status === '' || answer.status === 'yet') {
            flag += 1;
        }

    });

    if (flag != 0) {
        subStatus = 'Incomplete';
    }
    status.push(subStatus);
};

export default checkStatusAnswer;
export { checkSelectedAnswer };

