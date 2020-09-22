const xapi = require('xapi');

const KEYBOARD_TYPES = {
      NUMERIC     :   'Numeric'
    , SINGLELINE  :   'SingleLine'
    , PASSWORD    :   'Password'
    , PIN         :   'PIN'
}
const CALL_TYPES = {
      AUDIO     :   'Audio'
    , VIDEO     :   'Video'
}

const ZOOM_ID = 'zoomID';
const PASSCODE = 'zoompasscode';
const INROOMCONTROL_AUDIOCONTROL_PANELID = 'callzoom';
const postfix = '@zoomcrc.com';

/* Use these to check that its a valid number (depending on what you want to allow users to call */
const REGEXP_URLDIALER = /([a-zA-Z0-9@_\-\.]+)/; /*  . Use this one if you want to allow URL dialling */
const REGEXP_NUMERICDIALER =  /^([0-9]{3,10})$/; /* Use this one if you want to limit calls to numeric only. In this example, require number to be between 3 and 10 digits. */

var meetingID = '1234567890';


function getMeetingID(text){

         xapi.command("UserInterface Message TextInput Display", {
               InputType: KEYBOARD_TYPES.NUMERIC
             , Placeholder: "Use keypad to enter the meeting number:"
             , Title: "Zoom Meeting"
             , Text: text
             , SubmitText: "Next"
             , FeedbackId: ZOOM_ID
         }).catch((error) => { console.error(error); });
        }
function getPassword(text){

        xapi.command("UserInterface Message TextInput Display", {
           InputType: KEYBOARD_TYPES.PASSWORD
         , Placeholder: "Use keypad to enter the Passcode:"
         , Title: "Zoom Meeting Passcode"
         , Text: "Enter the Passcode for your Zoom Meeting"
         , SubmitText: "Join"
         , FeedbackId: PASSCODE
      }).catch((error) => { console.error(error); });
      }

/* This is the listener for the in-room control panel button that will trigger the dial panel to appear */
xapi.event.on('UserInterface Extensions Panel Clicked', (event) => {
    if(event.PanelId === INROOMCONTROL_AUDIOCONTROL_PANELID){
         getMeetingID("Enter the Zoom meeting id from your invite:" );
    }
});


/* Event listener for the dial pad been posted */

xapi.event.on('UserInterface Message TextInput Response', (event) => {
    switch(event.FeedbackId){
        case ZOOM_ID:
          var regex =REGEXP_NUMERICDIALER; //change this to whatever filter you want to check for validity
          var match = regex.exec(event.Text);
          if (match !== null) {
              meetingID = match[1];
          }
          else{
              showDialPad("You typed in an invalid number. Please try again." );
          }
          getPassword("Enter the Zoom meeting Password from your invite:" );
          break;
        case PASSCODE:
          var zoompasscode = event.Text;
          var numbertodial = meetingID + "." + zoompasscode + postfix;
              xapi.command("dial", {Number: numbertodial, Protocol: 'SIP', CallType: CALL_TYPES.VIDEO}).catch((error) => { console.error(error); });
          break;
    }
});
