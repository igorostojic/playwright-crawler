import crawler from "./crawler";

/**
 * crawler function has three parameters that we can use that needs to be entered in the odred as below:
 *  - search: is an input in google search field
 *  - keyboardKey: is simulating press of Control or Cmd depending on the system that script is being run on and values are "Control" for Windows and "Meta" for MacOS
 *  - htmlTag: is a tag from which we extract text and depending on what we need we can write it "body", "div", or if we need class, href or some other attribute we write "[class]", "[id]"
 */

crawler("", "", "");
