const app = require("express")();
const fs = require("fs");
const nodeFetch = require("node-fetch");
const jssoup = require("jssoup").default;


const PORT = 8080;

app.listen(PORT, () => console.log(`it is alive on http://localhost:${PORT}`));

app.get("/grade/:id", (req, res) => {
  const { id } = req.params;
  getAndReturnResult(id).then((output) => {
    res.status(200).send(output);
  });
});

const sumArray = (current: number, acc: number) => current + acc;

async function updateSavedPage(id) {
  console.log(`https://handins.ccs.neu.edu/courses/${id}/assignments`);
  let fetchResponse = await nodeFetch(
    `https://handins.ccs.neu.edu/courses/${id}/assignments`,
    {
      headers: {
        Cookie:
          "_bn_session=WkUxQy9zWlhKajlSSUtvaHQ2cTZld1FreFl5S1BKM0tiYnR0NXBRZHFmdmV3Q0Q3OVd4L2cwSXRmVmlPMWVmSFUxclI0TU5oQWg5bko4UkN2RUwvMnZHUjFVRVRZYWJqVlduYUpkd216YnIrQkd5T3dxemhpd0RvdUhPLytQd2hDYmVkT0tYcjVoM1ZSdi92UUJjeVNzMmRkMjRnYmtrVUdEUytnTUk4cGRwdzNVbnJrdTFJNk12YzBBbG41ZytOaUxZZWMwQXF2c2QwVmdBNy8zcGlGemd1RlVRT21WeExiRTdNN1dqZXNJST0tLWdiQ1FGSjk4aEdIUzljN0k2Zitsa0E9PQ%3D%3D--4ef550f927ac933799ae0af0117b323d11e7afc5",
      },
    }
  );
  let text = await fetchResponse.text();
  fs.writeFileSync("savedPage.html", text, function (err) {
    if (err) return console.log(err);
    console.log("Saved page to html");
  });
}

function getResult() {
  let soup = new jssoup(fs.readFileSync("savedPage.html"));
  let allValues = soup.findAll("td", { class: "text-right" });
  let allNums:number[] = allValues.map((item) =>
    parseFloat(item.text.replace(/\s/g, ""))
  );
  if (allNums.length == 0) {
    return { message: "Class Does Not Exist" };
  }
  let weights:number[] = allNums.filter((item, index) => index % 2 == 0);
  let values:number[] = allNums.filter((item, index) => index % 2 == 1);
  // console.log(gradeWeights);

  let gradedWeights:number[] = weights.filter((item, index) => !isNaN(values[index]));

  let gradedValues:number[] = values.filter((item, index) => !isNaN(item));
  // console.log(gradedValues);

  let pointsAccumulatedArr:number[] = gradedValues.map(
    (item, index) => (item * gradedWeights[index]) / 100
  );
  // console.log(pointsAccumulatedArr);

  let totalPointsAccumulated:number = pointsAccumulatedArr.reduce(sumArray, 0);
  let totalWeight:number = gradedWeights.reduce(sumArray, 0);

  return {
    possiblePoints: totalWeight,
    earnedPoints: totalPointsAccumulated,
    currentGrade: totalPointsAccumulated / totalWeight,
  };
}

async function getAndReturnResult(id) {
  await updateSavedPage(id);
  return getResult();
}
