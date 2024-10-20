const { default: axios } = require("axios");
const { CONFIG } = require("../constant/config");
const logger = require("../logger");
const { getHeaders } = require("./headers");
const constants = require("../constant");

const creation_portal_url = CONFIG.HOST.creation_portal;

// Questionset
/**
* To create the question set in creation portal
* @method
* @name createQuestionSet
* @param {Object} templateData - {
    {
    "request": {
        "questionset": {
            "name": "Enrollment challenges in DIKSHA Courses-1616141178859",
            "description": "Enrollment challenges in DIKSHA Courses-1616141178859",
            "code": "99199aec-66b8-11eb-b81d-a08cfd79f8b7-OBSERVATION-TEMPLATE-1616141179374",
            "mimeType": "application/vnd.sunbird.questionset",
            "primaryCategory": "observation",
            "entityType": "District",
            "language": [
                "English"
            ],
            "keywords": [
                "Framework",
                "Observation",
                "Challenges",
                " Enrollment",
                " Parents",
                " Courses "
            ],
            "startDate": "2023-03-20T08:06:19.374Z",
            "endDate": "2023-03-22T08:06:19.374Z",
            "createdBy": "356e1543-a8ea-4bf0-8639-fee164e8d245",
            "organisationId": "01329314824202649627",
            "creator": "aradhana1_62r2",
            "createdFor": [
                "01329314824202649627"
            ],
            "channel": "01329314824202649627",
            "programId": "e07c7131-4577-11ed-bcf5-df48f63ad78b",
            "author": "aradhana1_62r2",
            "framework": "ekstep_ncert_k-12"
        }
    }
}
* 
* @returns {String} - return Questionset unique identifier Id ( do_21376612089008128017430 )
*/

const createQuestionSet = async (templateData) => {
  try {
    const url = creation_portal_url + CONFIG.APIS.create_questionset;
    const data = {
      request: {
        questionset: { ...templateData },
      },
    };
    const config = {
      method: "post",
      url: url,
      headers: await getHeaders(true, constants.CREATION_PORTAL),
      data: data,
    };

    const res = await axios(config);

    if (res?.status === 200) {
      return res?.data?.result?.identifier;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    const errorResponse = error?.response?.data;
    logger.error(
      `Error while creating the Questionset : ${errorResponse?.responseCode} - ${errorResponse?.params?.errmsg}`
    );
  }
};

/**
* To update the question set with hierarchy and branchinglogic in creation portal
* @method
* @name updateQuestionSetHierarchy
* @param {Object} templateData - 
{
    "request": {
        "data": {
            "nodesModified": {
                "Comments and Reflection:": {
                    "metadata": {
                        "code": "Q1_1620904465409-1620904788217",
                        "name": "Comments and Reflection:",
                        "description": "Matrix description",
                        "mimeType": "application/vnd.sunbird.questionset",
                        "primaryCategory": "observation",
                        "allowMultipleInstances": "Yes",
                        "instances": {
                            "label": "Matrix"
                        }
                    },
                    "objectType": "QuestionSet",
                    "root": false,
                    "isNew": true
                },
                "Comments and Reflection: 2": {
                    "metadata": {
                        "code": "Q4_1620904465409-1620904788222",
                        "name": "Comments and Reflection: 2",
                        "description": "Matrix description",
                        "mimeType": "application/vnd.sunbird.questionset",
                        "primaryCategory": "observation",
                        "allowMultipleInstances": "Yes",
                        "instances": {
                            "label": "Matrix2"
                        }
                    },
                    "objectType": "QuestionSet",
                    "root": false,
                    "isNew": true
                }
            },
            "hierarchy": {
                "do_21377749714884198411469": {
                    "children": [
                        "Comments and Reflection:",
                        "Comments and Reflection: 2"
                    ],
                    "root": true
                },
                "Comments and Reflection:": {
                    "children": [
                        "do_2137646614572646401345",
                        "do_2137646614709207041346"
                    ],
                    "root": false
                },
                "Comments and Reflection: 2": {
                    "children": [
                        "do_2137646614898278401347",
                        "do_21376612087864524817429",
                        "do_21376612089008128017430"
                    ],
                    "root": false
                }
            }
        }
    }
}
* 
  * @returns {JSON} - response: 
  {
    "Comments and Reflection:": "do_21377895770669056011493",
    "Comments and Reflection: 2": "do_21377895770669056011495"
  }
    
*/
const updateQuestionSetHierarchy = async (templateData) => {
  try {
    const url = creation_portal_url + CONFIG.APIS.update_hierarchy;

    const config = {
      method: "patch",
      url: url,
      headers: await getHeaders(true, constants.CREATION_PORTAL),
      data: templateData,
    };

    const res = await axios(config);

    if (res?.status === 200) {
      return res?.data?.result?.identifiers;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    const errorResponse = error?.response?.data;
    logger.error(
      `Error while updating QuestionSetHierarchy: ${errorResponse?.responseCode} - ${errorResponse?.params?.errmsg}`
    );
  }
};

/**
 * To publish the question set in creation portal
 * @method
 * @name publishQuestionSet
 * @param {String} questionsetId - do_21376461469939302415285
 *
 * @returns {String} - response: "do_21376461469939302415285"
 */
const publishQuestionSet = async (questionsetId) => {
  const url =
    creation_portal_url + CONFIG.APIS.publish_questionset + "/" + questionsetId;
  const config = {
    method: "post",
    url: url,
    headers: await getHeaders(true, constants.CREATION_PORTAL),
    data: {},
  };

  const res = await axios(config);
  return res?.data?.result?.identifier;
};

/**
 * To read the questionset from creation portal
 * @method
 * @name readQuestionSetHierarchy
 * @param {String} questionsetId - do_21376461469939302415285
 *
 * @returns {JSON} - returns questionset with hierarchy
 */
const readQuestionSetHierarchy = async (questionSetId) => {
  try {
    const url =
      creation_portal_url +
      CONFIG.APIS.read_questionset +
      questionSetId +
      "?mode=edit";

    const config = {
      method: "get",
      url: url,
      headers: await getHeaders(true, constants.CREATION_PORTAL),
    };

    const res = await axios(config);

    if (res?.status === 200) {
      return res?.data?.result?.questionSet;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    const errorResponse = error?.response?.data;
    logger.error(
      `Error in readQuestionSetHierarchy: ${errorResponse?.responseCode} - ${errorResponse?.params?.errmsg}`
    );
  }
};

// Questions
/**
 * To create the questions in creation portal
 * @method
 * @name createQuestions
 * @param {String} questionId - do_213771658975903744111423
 * @param {Object} templateData - {"name":"What medium of instruction would you prefer for trainings?","code":"PS25_1597311656239","description":"","showRemarks":"Yes","mimeType":"application/vnd.sunbird.question","primaryCategory":"Multiselect Multiple Choice Question","interactionTypes":["choice"],"body":"<div class='question-body'><div class='mcq-title'><p>What medium of instruction would you prefer for trainings?&nbsp</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div><div class='mcq-title'><p>&nbsp</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>","interactions":{"validation":{"required":"Yes"},"response1":{"type":"choice","options":[{"value":"R1","label":"English"},{"value":"R2","label":"Hindi"},{"value":"R3","label":"Bi-lingual"}]}},"editorState":{"question":"<div class='question-body'><div class='mcq-title'><p>What medium of instruction would you prefer for trainings?&nbsp</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div><div class='mcq-title'><p>&nbsp</p></div><div data-choice-interaction='response1' class='mcq-vertical'></div></div>","options":[{"answer":false,"value":{"body":"<p>English</p>","value":0}},{"answer":false,"value":{"body":"<p>Hindi</p>","value":1}},{"answer":false,"value":{"body":"<p>Bi-lingual</p>","value":2}}]},"responseDeclaration":{"response1":{"maxScore":0,"cardinality":"single","type":"integer","correctResponse":{"outcomes":{"SCORE":0}}}},"instructions":{"default":""},"hints":"","evidence":{"mimeType":[]}}
 * @returns {string} -  return Question unique identifier Id
 */
const createQuestions = async (templateData, questionId) => {
  try {
    const url = creation_portal_url + CONFIG.APIS.create_question;
    const data = {
      request: {
        question: { ...templateData },
      },
    };
    const config = {
      method: "post",
      url: url,
      headers: await getHeaders(true, constants.CREATION_PORTAL),
      data: data,
    };

    const res = await axios(config);

    if (res?.status === 200) {
      return res?.data?.result?.identifier;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    const errorResponse = error?.response?.data;
    logger.error(
      `Error while creating the question for questionid: ${questionId}: ${errorResponse?.responseCode} - ${errorResponse?.params?.errmsg}`
    );
  }
};

/**
 * To publish the question in creation portal
 * @method
 * @name publishQuestion
 * @param {String} questionId - do_21376461469939302415285
 * @returns {JSON} - return question unique identifierID
 */
const publishQuestion = async (questionId) => {
  try {
    const url =
      creation_portal_url + CONFIG.APIS.publish_question + "/" + questionId;
    const config = {
      method: "post",
      url: url,
      headers: await getHeaders(true, constants.CREATION_PORTAL),
    };

    const res = await axios(config);

    if (res?.status === 200) {
      return res?.data?.result?.identifier;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    const errorResponse = error?.response?.data;
    logger.error(
      `Error  while publishing question for questionId ${questionId}: ${errorResponse?.responseCode} - ${errorResponse?.params?.errmsg}`
    );
  }
};

module.exports = {
  createQuestionSet,
  updateQuestionSetHierarchy,
  publishQuestionSet,
  createQuestions,
  publishQuestion,
  readQuestionSetHierarchy,
};
