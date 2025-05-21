
export const writeResultToAnswerSheet = (result) => {

    var resultSheet = [];
    const { part1, part2, part3, part4, part5, part6, part7 } = result;
    handleQuestion_simple(part1, resultSheet);
    handleQuestion_simple(part2, resultSheet);
    handleQuestion_complex(part3, resultSheet);
    handleQuestion_complex(part4, resultSheet);
    handleQuestion_simple(part5, resultSheet);

    handleQuestion_complex(part6, resultSheet);
    handleQuestion_complex(part7, resultSheet);

    console.log("newSheet", resultSheet);

    return resultSheet;

}

export const writeTranScript = (result) => {
    const transcript = {
        part3: [],
        part4: []
    };
    const { part3, part4 } = result;
    if (result) {
        if (part3) {
            getTranscript(transcript, part3, 'part3');
        }

        if (part4) {
            getTranscript(transcript, part4, 'part4');
        }
    }


    return transcript;

}



function getTranscript(transcript, part, name) {
    let object = [];

    part.forEach((element, index) => {
        object.push(element.transcript);
    });

    if (name === 'part3') {
        transcript.part3 = object;
    } else {
        transcript.part4 = object;
    }
}


function handleQuestion_complex(part, resultSheet) {
    let stt, selected, status, result;
    part.forEach((element, index) => {
        element.results.forEach((subElement, index) => {
            selected = subElement.choice;
            status = subElement.correct;
            stt = subElement.question.stt;
            result = subElement.question.result;


            let obejct = { stt, selected, status, result };
            resultSheet.push(obejct);
        })


    })
}


function handleQuestion_simple(part, resultSheet) {
    let stt, selected, status, result, audio, scriptAudio;
    part.forEach((element, index) => {
        selected = element.choice;
        status = element.correct;
        stt = element.question.stt;
        result = element.question.result;
        audio = element.question.audio;
        scriptAudio = { a: element.question.a, b: element.question.b, c: element.question.c, d: element.question.d }

        let obejct = { stt, selected, status, result, audio, scriptAudio };
        resultSheet.push(obejct);


    })
}