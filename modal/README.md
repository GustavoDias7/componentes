<pre style="font-family: sans-serif; letter-spacing: 1px;">
<h2><u>HTML</u></h2>
<h3>+ Example structure</h3>
<code><div style="background: #444; padding: 20px;">
&#60;div class="modal" id="modal1"&#62;
  &#60;div class="modal-content"&#62;
    &#60;a href="#" class="modal-close" id="modal-close1"&#62;&#60;/a&#62;
    &#60;!-- put here your tags... --&#62;
  &#60;/div&#62;
&#60;/div&#62;

</div></code>

<h3>+ Recommendations:</h3>
-> put your content/tags into .modal-content element
-> the classes (.modal, .modal-content and .modal-close) are used by CSS to apply the styles.
-> the IDs (#modal1, #modal-close1) are used by JavaScript to select the elements. 
-> set different ID for each modal.
-> set the the same classes (.modal, .modal-content and .modal-close) in all modal, to have the same style.

<hr>

<h2><u>JavaScript</u></h2>
<h3>+ Example</h3>
<code><div style="background: #444; padding: 20px;">
&#60;script src="./modal/modal.js"&#62;&#60;/script&#62;
&#60;script&#62;
  initModal({
    btnToActiveModal: "selectorName",
    modalContainer: "selectorName",
    btnToCloseModal: "selectorName",
    activeModalOnLoad: boolean,
    activeModalOnTrigger: {
      enable: boolean,
      elements: {
        trigger: "selctorName",
        target: "selectorName",
      },
      eventListener: "eventName",
    },
  })
&#60;/script&#62;

</div></code>

<h3>+ Explenation</h3>
- <u>btnToActiveModal:</u> the selector name of button to active modal.
*Recommendations:
You can set a selector name such as id or a other unique selector for have only one element to active the modal. 
Ex.: btnToActiveModal: "#modal-active-1"
You can set a selector name such as class, dataset, tag, etc... for have two or more elements to active the modal.
Ex.: btnToActiveModal: ".btns-active-modal"

- <u>modalContainer:</u> the selector name of modal container. It is used to close modal, when you click "out" of the modal.

- <u>btnToCloseModal:</u> the selector name of button to close the modal.

- <u>activeModalOnLoad (It's optional):</u> boolean (true) to active modal when the page is loaded.

- <u>activeModalOnTrigger (It's optional):</u> when the 'trigger' element is clicked, the 'target' elelent (other modal) will be actived.
  - <code style="background: #666">enable: true</code> enable the functionality;
  - <code style="background: #666">elements: { trigger: "selectorName" }</code> element that triggers the event;
  - <code style="background: #666">elements: { target: "selectorName" }</code> modal that is actived;
  - <code style="background: #666">eventListener: 'click'</code> event listener of the trigger;

</pre>