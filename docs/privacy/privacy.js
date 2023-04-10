function initPrivacyMessage(options = {}) {
  var { cssDefault = true } = options;
  var modalSelector = "#privacy-message";

  function createCookie(name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      expires +
      "; path=/";
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }

  function openMessage() {
    var cookieModal = document.querySelector(modalSelector);
    cookieModal.style.display = "block";
  }

  function closeMessage() {
    createCookie("cookies-padrao", "TRUE", 30);
    var cookieModal = document.querySelector(modalSelector);
    cookieModal.style.display = "none";
    console.log("close", document.cookie);
  }

  function addToHead(content) {
    var head = document.getElementsByTagName("head")[0];
    head.innerHTML = head.innerHTML + content;
  }

  function addToBody(content) {
    document.body.innerHTML = document.body.innerHTML + content;
  }

  //CSS Append
  var css = `
    <style>
      .privacy-message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        color: #fff;
        background-color: #222;
      }
      .privacy-message,
      .privacy-message * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .container-privacy-message {
        width: 100%;
        max-width: 1024px;
        margin: 0px auto;
        min-height: 56px;

        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .container-privacy-message button {
        background-color: transparent;
        border: none;
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
      .container-privacy-message button svg {
        width: inherit;
        height: inherit;
      }
    </style>
    `;
  if (cssDefault) addToHead(css);

  //HTML Modal Information Append
  var htmlModalAdvertaise = `
      <div class="privacy-message" id="privacy-message" style="display: none;">
        <div class="container-privacy-message">
          <p>Política de dados e de cookies</p>
          <button class="close-privacy-message" id="close-privacy-message">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="19.8728"
                height="2.4841"
                rx="1.24205"
                transform="matrix(0.715662 -0.698447 0.715662 0.698447 0 13.8801)"
                fill="white"
              />
              <rect
                width="19.8728"
                height="2.4841"
                rx="1.24205"
                transform="matrix(0.715662 0.698447 -0.715662 0.698447 1.77778 0.384865)"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    `;
  addToBody(htmlModalAdvertaise);
  //Call function that's check if view term cookie already set to open or not modal information

  var closePrivacyMessage = document.querySelector("#close-privacy-message");
  closePrivacyMessage.addEventListener("click", closeMessage);

  var hasCookie = readCookie("cookies-padrao") !== "TRUE";
  if (hasCookie) openMessage();
}
initPrivacyMessage();
