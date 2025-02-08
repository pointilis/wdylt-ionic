/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

( e => {
const { [ 'en' ]: { dictionary, getPluralForm } } = {"en":{"dictionary":{"Words: %0":"Words: %0","Characters: %0":"Characters: %0","Widget toolbar":"Widget toolbar","Insert paragraph before block":"Insert paragraph before block","Insert paragraph after block":"Insert paragraph after block","Press Enter to type after or press Shift + Enter to type before the widget":"Press Enter to type after or press Shift + Enter to type before the widget","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Keystrokes that can be used when a widget is selected (for example: image, table, etc.)","Insert a new paragraph directly after a widget":"Insert a new paragraph directly after a widget","Insert a new paragraph directly before a widget":"Insert a new paragraph directly before a widget","Move the caret to allow typing directly before a widget":"Move the caret to allow typing directly before a widget","Move the caret to allow typing directly after a widget":"Move the caret to allow typing directly after a widget","Move focus from an editable area back to the parent widget":"Move focus from an editable area back to the parent widget","Upload in progress":"Upload in progress","Undo":"Undo","Redo":"Redo","Rich Text Editor":"Rich Text Editor","Edit block":"Edit block","Click to edit block":"Click to edit block","Drag to move":"Drag to move","Next":"Next","Previous":"Previous","Editor toolbar":"Editor toolbar","Dropdown toolbar":"Dropdown toolbar","Dropdown menu":"Dropdown menu","Black":"Black","Dim grey":"Dim grey","Grey":"Grey","Light grey":"Light grey","White":"White","Red":"Red","Orange":"Orange","Yellow":"Yellow","Light green":"Light green","Green":"Green","Aquamarine":"Aquamarine","Turquoise":"Turquoise","Light blue":"Light blue","Blue":"Blue","Purple":"Purple","Editor block content toolbar":"Editor block content toolbar","Editor contextual toolbar":"Editor contextual toolbar","HEX":"HEX","No results found":"No results found","No searchable items":"No searchable items","Editor dialog":"Editor dialog","Close":"Close","Help Contents. To close this dialog press ESC.":"Help Contents. To close this dialog press ESC.","Below, you can find a list of keyboard shortcuts that can be used in the editor.":"Below, you can find a list of keyboard shortcuts that can be used in the editor.","(may require <kbd>Fn</kbd>)":"(may require <kbd>Fn</kbd>)","Accessibility":"Accessibility","Accessibility help":"Accessibility help","Press %0 for help.":"Press %0 for help.","Move focus in and out of an active dialog window":"Move focus in and out of an active dialog window","MENU_BAR_MENU_FILE":"File","MENU_BAR_MENU_EDIT":"Edit","MENU_BAR_MENU_VIEW":"View","MENU_BAR_MENU_INSERT":"Insert","MENU_BAR_MENU_FORMAT":"Format","MENU_BAR_MENU_TOOLS":"Tools","MENU_BAR_MENU_HELP":"Help","MENU_BAR_MENU_TEXT":"Text","MENU_BAR_MENU_FONT":"Font","Editor menu bar":"Editor menu bar","Please enter a valid color (e.g. \"ff0000\").":"Please enter a valid color (e.g. \"ff0000\").","Insert table":"Insert table","Header column":"Header column","Insert column left":"Insert column left","Insert column right":"Insert column right","Delete column":"Delete column","Select column":"Select column","Column":"Column","Header row":"Header row","Insert row below":"Insert row below","Insert row above":"Insert row above","Delete row":"Delete row","Select row":"Select row","Row":"Row","Merge cell up":"Merge cell up","Merge cell right":"Merge cell right","Merge cell down":"Merge cell down","Merge cell left":"Merge cell left","Split cell vertically":"Split cell vertically","Split cell horizontally":"Split cell horizontally","Merge cells":"Merge cells","Table toolbar":"Table toolbar","Table properties":"Table properties","Cell properties":"Cell properties","Border":"Border","Style":"Style","Width":"Width","Height":"Height","Color":"Color","Background":"Background","Padding":"Padding","Dimensions":"Dimensions","Table cell text alignment":"Table cell text alignment","Alignment":"Alignment","Horizontal text alignment toolbar":"Horizontal text alignment toolbar","Vertical text alignment toolbar":"Vertical text alignment toolbar","Table alignment toolbar":"Table alignment toolbar","None":"None","Solid":"Solid","Dotted":"Dotted","Dashed":"Dashed","Double":"Double","Groove":"Groove","Ridge":"Ridge","Inset":"Inset","Outset":"Outset","Align cell text to the left":"Align cell text to the left","Align cell text to the center":"Align cell text to the center","Align cell text to the right":"Align cell text to the right","Justify cell text":"Justify cell text","Align cell text to the top":"Align cell text to the top","Align cell text to the middle":"Align cell text to the middle","Align cell text to the bottom":"Align cell text to the bottom","Align table to the left":"Align table to the left","Center table":"Center table","Align table to the right":"Align table to the right","The color is invalid. Try \"#FF0000\" or \"rgb(255,0,0)\" or \"red\".":"The color is invalid. Try \"#FF0000\" or \"rgb(255,0,0)\" or \"red\".","The value is invalid. Try \"10px\" or \"2em\" or simply \"2\".":"The value is invalid. Try \"10px\" or \"2em\" or simply \"2\".","Enter table caption":"Enter table caption","Keystrokes that can be used in a table cell":"Keystrokes that can be used in a table cell","Move the selection to the next cell":"Move the selection to the next cell","Move the selection to the previous cell":"Move the selection to the previous cell","Insert a new table row (when in the last cell of a table)":"Insert a new table row (when in the last cell of a table)","Navigate through the table":"Navigate through the table","Table":"Table","Styles":"Styles","Multiple styles":"Multiple styles","Block styles":"Block styles","Text styles":"Text styles","Special characters":"Special characters","Category":"Category","All":"All","Arrows":"Arrows","Currency":"Currency","Latin":"Latin","Mathematical":"Mathematical","Text":"Text","leftwards simple arrow":"leftwards simple arrow","rightwards simple arrow":"rightwards simple arrow","upwards simple arrow":"upwards simple arrow","downwards simple arrow":"downwards simple arrow","leftwards double arrow":"leftwards double arrow","rightwards double arrow":"rightwards double arrow","upwards double arrow":"upwards double arrow","downwards double arrow":"downwards double arrow","leftwards dashed arrow":"leftwards dashed arrow","rightwards dashed arrow":"rightwards dashed arrow","upwards dashed arrow":"upwards dashed arrow","downwards dashed arrow":"downwards dashed arrow","leftwards arrow to bar":"leftwards arrow to bar","rightwards arrow to bar":"rightwards arrow to bar","upwards arrow to bar":"upwards arrow to bar","downwards arrow to bar":"downwards arrow to bar","up down arrow with base":"up down arrow with base","back with leftwards arrow above":"back with leftwards arrow above","end with leftwards arrow above":"end with leftwards arrow above","on with exclamation mark with left right arrow above":"on with exclamation mark with left right arrow above","soon with rightwards arrow above":"soon with rightwards arrow above","top with upwards arrow above":"top with upwards arrow above","Dollar sign":"Dollar sign","Euro sign":"Euro sign","Yen sign":"Yen sign","Pound sign":"Pound sign","Cent sign":"Cent sign","Euro-currency sign":"Euro-currency sign","Colon sign":"Colon sign","Cruzeiro sign":"Cruzeiro sign","French franc sign":"French franc sign","Lira sign":"Lira sign","Currency sign":"Currency sign","Bitcoin sign":"Bitcoin sign","Mill sign":"Mill sign","Naira sign":"Naira sign","Peseta sign":"Peseta sign","Rupee sign":"Rupee sign","Won sign":"Won sign","New sheqel sign":"New sheqel sign","Dong sign":"Dong sign","Kip sign":"Kip sign","Tugrik sign":"Tugrik sign","Drachma sign":"Drachma sign","German penny sign":"German penny sign","Peso sign":"Peso sign","Guarani sign":"Guarani sign","Austral sign":"Austral sign","Hryvnia sign":"Hryvnia sign","Cedi sign":"Cedi sign","Livre tournois sign":"Livre tournois sign","Spesmilo sign":"Spesmilo sign","Tenge sign":"Tenge sign","Indian rupee sign":"Indian rupee sign","Turkish lira sign":"Turkish lira sign","Nordic mark sign":"Nordic mark sign","Manat sign":"Manat sign","Ruble sign":"Ruble sign","Latin capital letter a with macron":"Latin capital letter a with macron","Latin small letter a with macron":"Latin small letter a with macron","Latin capital letter a with breve":"Latin capital letter a with breve","Latin small letter a with breve":"Latin small letter a with breve","Latin capital letter a with ogonek":"Latin capital letter a with ogonek","Latin small letter a with ogonek":"Latin small letter a with ogonek","Latin capital letter c with acute":"Latin capital letter c with acute","Latin small letter c with acute":"Latin small letter c with acute","Latin capital letter c with circumflex":"Latin capital letter c with circumflex","Latin small letter c with circumflex":"Latin small letter c with circumflex","Latin capital letter c with dot above":"Latin capital letter c with dot above","Latin small letter c with dot above":"Latin small letter c with dot above","Latin capital letter c with caron":"Latin capital letter c with caron","Latin small letter c with caron":"Latin small letter c with caron","Latin capital letter d with caron":"Latin capital letter d with caron","Latin small letter d with caron":"Latin small letter d with caron","Latin capital letter d with stroke":"Latin capital letter d with stroke","Latin small letter d with stroke":"Latin small letter d with stroke","Latin capital letter e with macron":"Latin capital letter e with macron","Latin small letter e with macron":"Latin small letter e with macron","Latin capital letter e with breve":"Latin capital letter e with breve","Latin small letter e with breve":"Latin small letter e with breve","Latin capital letter e with dot above":"Latin capital letter e with dot above","Latin small letter e with dot above":"Latin small letter e with dot above","Latin capital letter e with ogonek":"Latin capital letter e with ogonek","Latin small letter e with ogonek":"Latin small letter e with ogonek","Latin capital letter e with caron":"Latin capital letter e with caron","Latin small letter e with caron":"Latin small letter e with caron","Latin capital letter g with circumflex":"Latin capital letter g with circumflex","Latin small letter g with circumflex":"Latin small letter g with circumflex","Latin capital letter g with breve":"Latin capital letter g with breve","Latin small letter g with breve":"Latin small letter g with breve","Latin capital letter g with dot above":"Latin capital letter g with dot above","Latin small letter g with dot above":"Latin small letter g with dot above","Latin capital letter g with cedilla":"Latin capital letter g with cedilla","Latin small letter g with cedilla":"Latin small letter g with cedilla","Latin capital letter h with circumflex":"Latin capital letter h with circumflex","Latin small letter h with circumflex":"Latin small letter h with circumflex","Latin capital letter h with stroke":"Latin capital letter h with stroke","Latin small letter h with stroke":"Latin small letter h with stroke","Latin capital letter i with tilde":"Latin capital letter i with tilde","Latin small letter i with tilde":"Latin small letter i with tilde","Latin capital letter i with macron":"Latin capital letter i with macron","Latin small letter i with macron":"Latin small letter i with macron","Latin capital letter i with breve":"Latin capital letter i with breve","Latin small letter i with breve":"Latin small letter i with breve","Latin capital letter i with ogonek":"Latin capital letter i with ogonek","Latin small letter i with ogonek":"Latin small letter i with ogonek","Latin capital letter i with dot above":"Latin capital letter i with dot above","Latin small letter dotless i":"Latin small letter dotless i","Latin capital ligature ij":"Latin capital ligature ij","Latin small ligature ij":"Latin small ligature ij","Latin capital letter j with circumflex":"Latin capital letter j with circumflex","Latin small letter j with circumflex":"Latin small letter j with circumflex","Latin capital letter k with cedilla":"Latin capital letter k with cedilla","Latin small letter k with cedilla":"Latin small letter k with cedilla","Latin small letter kra":"Latin small letter kra","Latin capital letter l with acute":"Latin capital letter l with acute","Latin small letter l with acute":"Latin small letter l with acute","Latin capital letter l with cedilla":"Latin capital letter l with cedilla","Latin small letter l with cedilla":"Latin small letter l with cedilla","Latin capital letter l with caron":"Latin capital letter l with caron","Latin small letter l with caron":"Latin small letter l with caron","Latin capital letter l with middle dot":"Latin capital letter l with middle dot","Latin small letter l with middle dot":"Latin small letter l with middle dot","Latin capital letter l with stroke":"Latin capital letter l with stroke","Latin small letter l with stroke":"Latin small letter l with stroke","Latin capital letter n with acute":"Latin capital letter n with acute","Latin small letter n with acute":"Latin small letter n with acute","Latin capital letter n with cedilla":"Latin capital letter n with cedilla","Latin small letter n with cedilla":"Latin small letter n with cedilla","Latin capital letter n with caron":"Latin capital letter n with caron","Latin small letter n with caron":"Latin small letter n with caron","Latin small letter n preceded by apostrophe":"Latin small letter n preceded by apostrophe","Latin capital letter eng":"Latin capital letter eng","Latin small letter eng":"Latin small letter eng","Latin capital letter o with macron":"Latin capital letter o with macron","Latin small letter o with macron":"Latin small letter o with macron","Latin capital letter o with breve":"Latin capital letter o with breve","Latin small letter o with breve":"Latin small letter o with breve","Latin capital letter o with double acute":"Latin capital letter o with double acute","Latin small letter o with double acute":"Latin small letter o with double acute","Latin capital ligature oe":"Latin capital ligature oe","Latin small ligature oe":"Latin small ligature oe","Latin capital letter r with acute":"Latin capital letter r with acute","Latin small letter r with acute":"Latin small letter r with acute","Latin capital letter r with cedilla":"Latin capital letter r with cedilla","Latin small letter r with cedilla":"Latin small letter r with cedilla","Latin capital letter r with caron":"Latin capital letter r with caron","Latin small letter r with caron":"Latin small letter r with caron","Latin capital letter s with acute":"Latin capital letter s with acute","Latin small letter s with acute":"Latin small letter s with acute","Latin capital letter s with circumflex":"Latin capital letter s with circumflex","Latin small letter s with circumflex":"Latin small letter s with circumflex","Latin capital letter s with cedilla":"Latin capital letter s with cedilla","Latin small letter s with cedilla":"Latin small letter s with cedilla","Latin capital letter s with caron":"Latin capital letter s with caron","Latin small letter s with caron":"Latin small letter s with caron","Latin capital letter t with cedilla":"Latin capital letter t with cedilla","Latin small letter t with cedilla":"Latin small letter t with cedilla","Latin capital letter t with caron":"Latin capital letter t with caron","Latin small letter t with caron":"Latin small letter t with caron","Latin capital letter t with stroke":"Latin capital letter t with stroke","Latin small letter t with stroke":"Latin small letter t with stroke","Latin capital letter u with tilde":"Latin capital letter u with tilde","Latin small letter u with tilde":"Latin small letter u with tilde","Latin capital letter u with macron":"Latin capital letter u with macron","Latin small letter u with macron":"Latin small letter u with macron","Latin capital letter u with breve":"Latin capital letter u with breve","Latin small letter u with breve":"Latin small letter u with breve","Latin capital letter u with ring above":"Latin capital letter u with ring above","Latin small letter u with ring above":"Latin small letter u with ring above","Latin capital letter u with double acute":"Latin capital letter u with double acute","Latin small letter u with double acute":"Latin small letter u with double acute","Latin capital letter u with ogonek":"Latin capital letter u with ogonek","Latin small letter u with ogonek":"Latin small letter u with ogonek","Latin capital letter w with circumflex":"Latin capital letter w with circumflex","Latin small letter w with circumflex":"Latin small letter w with circumflex","Latin capital letter y with circumflex":"Latin capital letter y with circumflex","Latin small letter y with circumflex":"Latin small letter y with circumflex","Latin capital letter y with diaeresis":"Latin capital letter y with diaeresis","Latin capital letter z with acute":"Latin capital letter z with acute","Latin small letter z with acute":"Latin small letter z with acute","Latin capital letter z with dot above":"Latin capital letter z with dot above","Latin small letter z with dot above":"Latin small letter z with dot above","Latin capital letter z with caron":"Latin capital letter z with caron","Latin small letter z with caron":"Latin small letter z with caron","Latin small letter long s":"Latin small letter long s","Less-than sign":"Less-than sign","Greater-than sign":"Greater-than sign","Less-than or equal to":"Less-than or equal to","Greater-than or equal to":"Greater-than or equal to","En dash":"En dash","Em dash":"Em dash","Macron":"Macron","Overline":"Overline","Degree sign":"Degree sign","Minus sign":"Minus sign","Plus-minus sign":"Plus-minus sign","Division sign":"Division sign","Fraction slash":"Fraction slash","Multiplication sign":"Multiplication sign","Latin small letter f with hook":"Latin small letter f with hook","Integral":"Integral","N-ary summation":"N-ary summation","Infinity":"Infinity","Square root":"Square root","Tilde operator":"Tilde operator","Approximately equal to":"Approximately equal to","Almost equal to":"Almost equal to","Not equal to":"Not equal to","Identical to":"Identical to","Element of":"Element of","Not an element of":"Not an element of","Contains as member":"Contains as member","N-ary product":"N-ary product","Logical and":"Logical and","Logical or":"Logical or","Not sign":"Not sign","Intersection":"Intersection","Union":"Union","Partial differential":"Partial differential","For all":"For all","There exists":"There exists","Empty set":"Empty set","Nabla":"Nabla","Asterisk operator":"Asterisk operator","Proportional to":"Proportional to","Angle":"Angle","Vulgar fraction one quarter":"Vulgar fraction one quarter","Vulgar fraction one half":"Vulgar fraction one half","Vulgar fraction three quarters":"Vulgar fraction three quarters","Single left-pointing angle quotation mark":"Single left-pointing angle quotation mark","Single right-pointing angle quotation mark":"Single right-pointing angle quotation mark","Left-pointing double angle quotation mark":"Left-pointing double angle quotation mark","Right-pointing double angle quotation mark":"Right-pointing double angle quotation mark","Left single quotation mark":"Left single quotation mark","Right single quotation mark":"Right single quotation mark","Left double quotation mark":"Left double quotation mark","Right double quotation mark":"Right double quotation mark","Single low-9 quotation mark":"Single low-9 quotation mark","Double low-9 quotation mark":"Double low-9 quotation mark","Inverted exclamation mark":"Inverted exclamation mark","Inverted question mark":"Inverted question mark","Two dot leader":"Two dot leader","Horizontal ellipsis":"Horizontal ellipsis","Double dagger":"Double dagger","Per mille sign":"Per mille sign","Per ten thousand sign":"Per ten thousand sign","Double exclamation mark":"Double exclamation mark","Question exclamation mark":"Question exclamation mark","Exclamation question mark":"Exclamation question mark","Double question mark":"Double question mark","Copyright sign":"Copyright sign","Registered sign":"Registered sign","Trade mark sign":"Trade mark sign","Section sign":"Section sign","Paragraph sign":"Paragraph sign","Reversed paragraph sign":"Reversed paragraph sign","Source":"Source","Show source":"Show source","Show blocks":"Show blocks","Select all":"Select all","Disable editing":"Disable editing","Enable editing":"Enable editing","Previous editable region":"Previous editable region","Next editable region":"Next editable region","Navigate editable regions":"Navigate editable regions","Remove Format":"Remove Format","Page break":"Page break","media widget":"media widget","Media URL":"Media URL","Paste the media URL in the input.":"Paste the media URL in the input.","Tip: Paste the URL into the content to embed faster.":"Tip: Paste the URL into the content to embed faster.","The URL must not be empty.":"The URL must not be empty.","This media URL is not supported.":"This media URL is not supported.","Insert media":"Insert media","Media":"Media","Media toolbar":"Media toolbar","Open media in new tab":"Open media in new tab","Numbered List":"Numbered List","Bulleted List":"Bulleted List","To-do List":"To-do List","Bulleted list styles toolbar":"Bulleted list styles toolbar","Numbered list styles toolbar":"Numbered list styles toolbar","Toggle the disc list style":"Toggle the disc list style","Toggle the circle list style":"Toggle the circle list style","Toggle the square list style":"Toggle the square list style","Toggle the decimal list style":"Toggle the decimal list style","Toggle the decimal with leading zero list style":"Toggle the decimal with leading zero list style","Toggle the lower–roman list style":"Toggle the lower–roman list style","Toggle the upper–roman list style":"Toggle the upper–roman list style","Toggle the lower–latin list style":"Toggle the lower–latin list style","Toggle the upper–latin list style":"Toggle the upper–latin list style","Disc":"Disc","Circle":"Circle","Square":"Square","Decimal":"Decimal","Decimal with leading zero":"Decimal with leading zero","Lower–roman":"Lower–roman","Upper-roman":"Upper-roman","Lower-latin":"Lower-latin","Upper-latin":"Upper-latin","List properties":"List properties","Start at":"Start at","Invalid start index value.":"Invalid start index value.","Start index must be greater than 0.":"Start index must be greater than 0.","Reversed order":"Reversed order","Keystrokes that can be used in a list":"Keystrokes that can be used in a list","Increase list item indent":"Increase list item indent","Decrease list item indent":"Decrease list item indent","Entering a to-do list":"Entering a to-do list","Leaving a to-do list":"Leaving a to-do list","Unlink":"Unlink","Link":"Link","Link URL":"Link URL","Link URL must not be empty.":"Link URL must not be empty.","Link image":"Link image","Edit link":"Edit link","Open link in new tab":"Open link in new tab","This link has no URL":"This link has no URL","Open in a new tab":"Open in a new tab","Downloadable":"Downloadable","Create link":"Create link","Move out of a link":"Move out of a link","Scroll to target":"Scroll to target","Language":"Language","Choose language":"Choose language","Remove language":"Remove language","Increase indent":"Increase indent","Decrease indent":"Decrease indent","image widget":"image widget","Wrap text":"Wrap text","Break text":"Break text","In line":"In line","Side image":"Side image","Full size image":"Full size image","Left aligned image":"Left aligned image","Centered image":"Centered image","Right aligned image":"Right aligned image","Change image text alternative":"Change image text alternative","Text alternative":"Text alternative","Enter image caption":"Enter image caption","Insert image":"Insert image","Replace image":"Replace image","Upload from computer":"Upload from computer","Replace from computer":"Replace from computer","Upload image from computer":"Upload image from computer","Image from computer":"Image from computer","From computer":"From computer","Replace image from computer":"Replace image from computer","Upload failed":"Upload failed","You have no image upload permissions.":"You have no image upload permissions.","Image toolbar":"Image toolbar","Resize image":"Resize image","Resize image to %0":"Resize image to %0","Resize image to the original size":"Resize image to the original size","Resize image (in %0)":"Resize image (in %0)","Original":"Original","Custom image size":"Custom image size","Custom":"Custom","Image resize list":"Image resize list","Insert image via URL":"Insert image via URL","Insert via URL":"Insert via URL","Image via URL":"Image via URL","Via URL":"Via URL","Update image URL":"Update image URL","Caption for the image":"Caption for the image","Caption for image: %0":"Caption for image: %0","The value must not be empty.":"The value must not be empty.","The value should be a plain number.":"The value should be a plain number.","Uploading image":"Uploading image","Image upload complete":"Image upload complete","Error during image upload":"Error during image upload","Image":"Image","HTML object":"HTML object","Insert HTML":"Insert HTML","HTML snippet":"HTML snippet","Paste raw HTML here...":"Paste raw HTML here...","Edit source":"Edit source","Save changes":"Save changes","No preview available":"No preview available","Empty snippet content":"Empty snippet content","Horizontal line":"Horizontal line","Yellow marker":"Yellow marker","Green marker":"Green marker","Pink marker":"Pink marker","Blue marker":"Blue marker","Red pen":"Red pen","Green pen":"Green pen","Remove highlight":"Remove highlight","Highlight":"Highlight","Text highlight toolbar":"Text highlight toolbar","Heading":"Heading","Choose heading":"Choose heading","Heading 1":"Heading 1","Heading 2":"Heading 2","Heading 3":"Heading 3","Heading 4":"Heading 4","Heading 5":"Heading 5","Heading 6":"Heading 6","Type your title":"Type your title","Type or paste your content here.":"Type or paste your content here.","Font Size":"Font Size","Tiny":"Tiny","Small":"Small","Big":"Big","Huge":"Huge","Font Family":"Font Family","Default":"Default","Font Color":"Font Color","Font Background Color":"Font Background Color","Document colors":"Document colors","Find and replace":"Find and replace","Find in text…":"Find in text…","Find":"Find","Previous result":"Previous result","Next result":"Next result","Replace":"Replace","Replace all":"Replace all","Match case":"Match case","Whole words only":"Whole words only","Replace with…":"Replace with…","Text to find must not be empty.":"Text to find must not be empty.","Tip: Find some text first in order to replace it.":"Tip: Find some text first in order to replace it.","Advanced options":"Advanced options","Find in the document":"Find in the document","Insert a soft break (a <code>&lt;br&gt;</code> element)":"Insert a soft break (a <code>&lt;br&gt;</code> element)","Insert a hard break (a new paragraph)":"Insert a hard break (a new paragraph)","Cancel":"Cancel","Clear":"Clear","Remove color":"Remove color","Restore default":"Restore default","Save":"Save","Show more items":"Show more items","%0 of %1":"%0 of %1","Cannot upload file:":"Cannot upload file:","Rich Text Editor. Editing area: %0":"Rich Text Editor. Editing area: %0","Insert with file manager":"Insert with file manager","Replace with file manager":"Replace with file manager","Insert image with file manager":"Insert image with file manager","Replace image with file manager":"Replace image with file manager","File":"File","With file manager":"With file manager","Toggle caption off":"Toggle caption off","Toggle caption on":"Toggle caption on","Content editing keystrokes":"Content editing keystrokes","These keyboard shortcuts allow for quick access to content editing features.":"These keyboard shortcuts allow for quick access to content editing features.","User interface and content navigation keystrokes":"User interface and content navigation keystrokes","Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface.":"Use the following keystrokes for more efficient navigation in the CKEditor 5 user interface.","Close contextual balloons, dropdowns, and dialogs":"Close contextual balloons, dropdowns, and dialogs","Open the accessibility help dialog":"Open the accessibility help dialog","Move focus between form fields (inputs, buttons, etc.)":"Move focus between form fields (inputs, buttons, etc.)","Move focus to the menu bar, navigate between menu bars":"Move focus to the menu bar, navigate between menu bars","Move focus to the toolbar, navigate between toolbars":"Move focus to the toolbar, navigate between toolbars","Navigate through the toolbar or menu bar":"Navigate through the toolbar or menu bar","Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content.":"Execute the currently focused button. Executing buttons that interact with the editor content moves the focus back to the content.","Accept":"Accept","Paragraph":"Paragraph","Color picker":"Color picker","Insert code block":"Insert code block","Plain text":"Plain text","Leaving %0 code snippet":"Leaving %0 code snippet","Entering %0 code snippet":"Entering %0 code snippet","Entering code snippet":"Entering code snippet","Leaving code snippet":"Leaving code snippet","Code block":"Code block","Copy selected content":"Copy selected content","Paste content":"Paste content","Paste content as plain text":"Paste content as plain text","Insert image or file":"Insert image or file","Could not obtain resized image URL.":"Could not obtain resized image URL.","Selecting resized image failed":"Selecting resized image failed","Could not insert image at the current position.":"Could not insert image at the current position.","Inserting image failed":"Inserting image failed","Open file manager":"Open file manager","Cannot determine a category for the uploaded file.":"Cannot determine a category for the uploaded file.","Cannot access default workspace.":"Cannot access default workspace.","You have no image editing permissions.":"You have no image editing permissions.","Edit image":"Edit image","Processing the edited image.":"Processing the edited image.","Server failed to process the image.":"Server failed to process the image.","Failed to determine category of edited image.":"Failed to determine category of edited image.","Bookmark":"Bookmark","Insert":"Insert","Update":"Update","Edit bookmark":"Edit bookmark","Remove bookmark":"Remove bookmark","Bookmark name":"Bookmark name","Enter the bookmark name without spaces.":"Enter the bookmark name without spaces.","Bookmark must not be empty.":"Bookmark must not be empty.","Bookmark name cannot contain space characters.":"Bookmark name cannot contain space characters.","Bookmark name already exists.":"Bookmark name already exists.","bookmark widget":"bookmark widget","Block quote":"Block quote","Bold":"Bold","Italic":"Italic","Underline":"Underline","Code":"Code","Strikethrough":"Strikethrough","Subscript":"Subscript","Superscript":"Superscript","Italic text":"Italic text","Move out of an inline code style":"Move out of an inline code style","Bold text":"Bold text","Underline text":"Underline text","Strikethrough text":"Strikethrough text","Saving changes":"Saving changes","Revert autoformatting action":"Revert autoformatting action","Align left":"Align left","Align right":"Align right","Align center":"Align center","Justify":"Justify","Text alignment":"Text alignment","Text alignment toolbar":"Text alignment toolbar"},getPluralForm(n){return (n != 1);}}};
e[ 'en' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en' ].dictionary = Object.assign( e[ 'en' ].dictionary, dictionary );
e[ 'en' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
