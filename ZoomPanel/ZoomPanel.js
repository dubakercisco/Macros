const xapi = require('xapi');

//Zoom In-Call Control Panel Version 1.0 - Created by Dustin Baker - dubaker@cisco.com
//Check out developer.webex.com for more information

var volume


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "changelayout") {
    if(event.Type == 'pressed') { 
      console.log(`Change Layout was Pressed`);
    xapi.command("Call DTMFSend", {
          DTMFString: "11"})
}}});

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "audiomute") {
      if(event.Type == 'pressed'){
         console.log(`Audio was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "2"})
}}}) 

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "videomute") {
      if(event.Type == 'pressed'){
         console.log(`Exit was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "4"})
}}}) 

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "record") {
      if(event.Type == 'pressed'){
         console.log(`Exit was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "5"})
}}}) 

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "videonames") {
      if(event.Type == 'pressed'){
         console.log(`Show/Hide Names was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "12"})
}}});    

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "gallerynext") {
      if(event.Type == 'pressed'){
         console.log(`Gallery Next was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "106"})
}}});    

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "galleryprevious") {
      if(event.Type == 'pressed'){
         console.log(`Gallery Previous was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "104"})
}}});        

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "chat") {
      if(event.Type == 'pressed'){
         console.log(`Show/Hide Chat was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "107"})
}}});        

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "participants") {
      if(event.Type == 'pressed'){
         console.log(`Show Participants was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "16"});
}}});    

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "captions") {
      if(event.Type == 'pressed'){
         console.log(`Show/Hide Captions was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "108"})
}}});        

xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == "exit") {
      if(event.Type == 'pressed'){
         console.log(`Exit was Pressed`);
      xapi.command("Call DTMFSend", {
        DTMFString: "*"})
}}})           