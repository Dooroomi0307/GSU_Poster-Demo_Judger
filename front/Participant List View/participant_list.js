//Participant data array
//need to fetch participant info from SQL
var participants = [
  { name: "Participant1", projectName: "Machine Learning", profile: "Lorem ipsum dolor sit amet..." },
  { name: "Participant2", projectName: "Programming Language Concept", profile: "Lorem ipsum dolor sit amet..." },
];

var table = document.getElementById("participantTable");

// Loop through participants and populate the table
for (var i = 0; i < participants.length; i++) {
  var participant = participants[i];

  // Create a new row
  var row = table.insertRow();

  // Insert name column
  var nameCell = row.insertCell();
  nameCell.innerHTML = participant.name;

  // Insert project name column
  var projectNameCell = row.insertCell();
  projectNameCell.innerHTML = participant.projectName;

  // Insert evaluate column
  var evaluateCell = row.insertCell();
  var evaluateButton = document.createElement("button");
  evaluateButton.innerHTML = "Evaluate";
  evaluateButton.addEventListener("click", createProfileWindow(participant.profile));
  evaluateCell.appendChild(evaluateButton);
}

// Function to open a new window with the participant's profile
function createProfileWindow(profile) {
  return function() {
    var profileWindow = window.open("", "_blank", "width=400,height=1000");
    profileWindow.document.write("<html><body><h2>Participant Profile</h2><p>" + profile + "</p></body></html>");
  };
}
