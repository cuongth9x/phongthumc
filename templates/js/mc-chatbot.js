(function () {
    'use strict';

    var answers = {
        price: 'Chi phí phụ thuộc vào hình thức thu âm và yêu cầu chỉnh sửa. Bạn hãy gọi 0986 543 723 để MC Studio báo giá chính xác nhé.',
        booking: 'Bạn có thể đặt lịch bằng cách gọi 0986 543 723. MC Studio sẽ tư vấn khung giờ phù hợp và chuẩn bị phòng thu trước khi bạn đến.',
        address: 'MC Studio ở Tiền Thịnh, Lưu Vệ, Thanh Hoá. Hãy gọi trước khi đến để được hướng dẫn đường đi và giữ lịch nhé.',
        service: 'MC Studio nhận thu âm bài hát, thu âm đám cưới, quảng cáo, hoà âm phối khí và quay MV.'
    };

    function addMessage(text, type) {
        var messages = document.querySelector('.mc-chat__messages');
        var message = document.createElement('div');
        message.className = 'mc-chat__message mc-chat__message--' + type;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function initChat() {
        if (document.querySelector('.mc-chat')) return;

        var style = document.createElement('style');
        style.textContent = '.mc-chat{position:fixed;right:22px;bottom:22px;z-index:9999;font-family:Arial,sans-serif}.mc-chat__toggle{display:flex;align-items:center;gap:8px;height:52px;padding:0 20px;border:0;border-radius:28px;background:#ff5500;color:#fff;font-size:15px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.32);cursor:pointer}.mc-chat__toggle i{font-size:20px}.mc-chat__panel{position:absolute;right:0;bottom:66px;width:340px;overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:#171719;box-shadow:0 18px 55px rgba(0,0,0,.45);opacity:0;visibility:hidden;transform:translateY(12px) scale(.98);transform-origin:bottom right;transition:.22s ease}.mc-chat--open .mc-chat__panel{opacity:1;visibility:visible;transform:none}.mc-chat__header{display:flex;align-items:center;gap:11px;padding:15px 16px;background:linear-gradient(135deg,#ff5500,#e74500);color:#fff}.mc-chat__header strong,.mc-chat__header small{display:block}.mc-chat__header strong{font-size:16px}.mc-chat__header small{margin-top:2px;font-size:11px;opacity:.85}.mc-chat__avatar{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#fff;color:#ff5500;font-weight:800}.mc-chat__close{margin-left:auto;border:0;background:transparent;color:#fff;font-size:27px;line-height:1;cursor:pointer}.mc-chat__messages{height:180px;overflow-y:auto;padding:15px;background:#f4f4f5}.mc-chat__message{max-width:84%;margin-bottom:9px;padding:10px 12px;border-radius:12px;font-size:13px;line-height:1.45}.mc-chat__message--bot{border-bottom-left-radius:3px;background:#fff;color:#252525}.mc-chat__message--user{margin-left:auto;border-bottom-right-radius:3px;background:#ff5500;color:#fff}.mc-chat__choices{display:flex;flex-wrap:wrap;gap:7px;padding:12px;background:#fff}.mc-chat__choices button{padding:7px 9px;border:1px solid #ff5500;border-radius:16px;background:#fff;color:#d94800;font-size:12px;cursor:pointer}.mc-chat__choices button:hover{background:#ff5500;color:#fff}.mc-chat__call{display:block;padding:12px;background:#202023;color:#fff!important;text-align:center;font-size:13px;font-weight:700}.mc-chat__call i{margin-right:5px;color:#ff5500}@media(max-width:480px){.mc-chat{right:12px;bottom:12px}.mc-chat__panel{position:fixed;right:12px;bottom:76px;left:12px;width:auto}.mc-chat__toggle span{display:none}.mc-chat__toggle{width:52px;padding:0;justify-content:center}}';
        document.head.appendChild(style);

        var wrapper = document.createElement('div');
        wrapper.className = 'mc-chat';
        wrapper.innerHTML =
            '<section class="mc-chat__panel" aria-hidden="true" aria-label="Hỗ trợ khách hàng">' +
                '<header class="mc-chat__header"><span class="mc-chat__avatar">MC</span><div><strong>MC Studio</strong><small>Thường trả lời ngay</small></div><button class="mc-chat__close" type="button" aria-label="Đóng cửa sổ chat">&times;</button></header>' +
                '<div class="mc-chat__messages"><div class="mc-chat__message mc-chat__message--bot">Xin chào! Bạn cần MC Studio hỗ trợ nội dung nào?</div></div>' +
                '<div class="mc-chat__choices">' +
                    '<button type="button" data-answer="price">Báo giá thu âm</button>' +
                    '<button type="button" data-answer="booking">Đặt lịch phòng thu</button>' +
                    '<button type="button" data-answer="service">Các dịch vụ</button>' +
                    '<button type="button" data-answer="address">Địa chỉ studio</button>' +
                '</div>' +
                '<a class="mc-chat__call" href="tel:0986543723"><i class="fa fa-phone"></i> Gọi tư vấn: 0986 543 723</a>' +
            '</section>' +
            '<button class="mc-chat__toggle" type="button" aria-label="Mở hỗ trợ trực tuyến" aria-expanded="false"><i class="fa fa-comments"></i><span>Hỗ trợ</span></button>';
        document.body.appendChild(wrapper);

        var panel = wrapper.querySelector('.mc-chat__panel');
        var toggle = wrapper.querySelector('.mc-chat__toggle');
        var close = wrapper.querySelector('.mc-chat__close');

        function setOpen(open) {
            wrapper.classList.toggle('mc-chat--open', open);
            panel.setAttribute('aria-hidden', open ? 'false' : 'true');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        toggle.addEventListener('click', function () { setOpen(!wrapper.classList.contains('mc-chat--open')); });
        close.addEventListener('click', function () { setOpen(false); });
        wrapper.querySelector('.mc-chat__choices').addEventListener('click', function (event) {
            var button = event.target.closest('button[data-answer]');
            if (!button) return;
            addMessage(button.textContent, 'user');
            window.setTimeout(function () { addMessage(answers[button.getAttribute('data-answer')], 'bot'); }, 250);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initChat);
    else initChat();
}());
