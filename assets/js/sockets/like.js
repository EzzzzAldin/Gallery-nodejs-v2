const socket = io();

// Get Data To Use To Create Socket
const btnLike = document.getElementById('btnLike');
const picId = document.getElementById('picId').value;
const likeCount = document.getElementById('likeCount').innerHTML;
const likeCon = document.getElementById('like-container');
const haert = document.getElementById('haert');
const userId = document.getElementById('userId').value;
const btndisLike = document.getElementById('btndisLike');

// Create Room Likes
socket.emit('joinpicRoom', picId);


// Pass All Data to Run Function Like
btnLike.onclick = () => {
    socket.emit('presslike', {
        picId: picId,
        like: 1,
        userId: userId
    })
    
};

// If User Don't Press Like
if( btnLike.classList[4] === undefined || Math.floor(likeCount) <= 0) {
    // Lithen Event Done Press Like
    socket.on('likeDone', data => {
    let like =  Math.floor(likeCount) + data.like;
    likeCon.innerHTML = `
    <span id="likeCount">
        ${like} Like
    </span>    
    `;
    haert.classList.add('btnColor');
    btnLike.onclick = () => {
    // Pass New Data If User Press DisLike
    socket.emit('pressdislike', {
        picId: picId,
        like: 1,
        userId: userId
    });
    }
});
// Lithen Event DisLike
socket.on('clearlike', data => {
    let like =  Math.floor(likeCount);
    likeCon.innerHTML = `
    <span id="likeCount">
        ${like} Like
    </span>    
    `;
    haert.classList.remove('btnColor');
})
} else {
    // If User Press Like
    socket.on('likeDone', data => {
        let like =  Math.floor(likeCount) - data.like;
        likeCon.innerHTML = `
        <span id="likeCount">
            ${like} Like
        </span>    
        `;
        haert.classList.remove('btnColor');
        btnLike.onclick = () => {
        // Pass New Data If User Press DisLike
        socket.emit('pressdislike', {
            picId: picId,
            like: 1,
            userId: userId
        });
        }
    });
    // Lithen Event DisLike
    socket.on('clearlike', data => {
        let like =  Math.floor(likeCount);
        likeCon.innerHTML = `
        <span id="likeCount">
            ${like} Like
        </span>    
        `;
        haert.classList.add('btnColor');
    })

};





