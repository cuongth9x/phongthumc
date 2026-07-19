(function () {
    "use strict";

    function createInvite() {
        if (document.getElementById("mc-chat-invite")) {
            return;
        }

        var invite = document.createElement("button");
        invite.type = "button";
        invite.id = "mc-chat-invite";
        invite.className = "mc-chat-invite";
        invite.setAttribute("aria-label", "Mở tư vấn trực tuyến");
        invite.innerHTML = "<strong>Phòng Thu MC</strong>Xin chào 👋 Bạn cần tư vấn thu âm không?";
        invite.addEventListener("click", window.openMcStudioChat);
        document.body.appendChild(invite);
    }

    function loadConfig() {
        if (document.getElementById("mc-botpress-config")) {
            return;
        }

        window.botpress.on("webchat:opened", function () {
            var invite = document.getElementById("mc-chat-invite");
            if (invite) {
                invite.style.display = "none";
            }
        });

        window.botpress.on("webchat:closed", function () {
            var invite = document.getElementById("mc-chat-invite");
            if (invite) {
                invite.style.display = "";
            }
        });

        var config = document.createElement("script");
        config.id = "mc-botpress-config";
        config.src = "templates/js/botpress-config.js";
        document.body.appendChild(config);
    }

    function loadBotpress() {
        if (window.botpress && typeof window.botpress.init === "function") {
            loadConfig();
            return;
        }

        var inject = document.createElement("script");
        inject.src = "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
        inject.addEventListener("load", loadConfig);
        document.body.appendChild(inject);
    }

    window.openMcStudioChat = function () {
        if (window.botpress && typeof window.botpress.open === "function") {
            window.botpress.open();
            var invite = document.getElementById("mc-chat-invite");
            if (invite) {
                invite.style.display = "none";
            }
        }
    };

    createInvite();
    loadBotpress();
}());
