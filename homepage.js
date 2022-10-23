window.addEventListener('DOMContentLoaded', () => {
    const roomsPerSide = 16; 
    document.documentElement.style.setProperty('--rooms-per-side', `${roomsPerSide}`); 
    
    // INIT
    
    let rooms = []; 
    for(let y = 0; y < roomsPerSide; ++y) {
        rooms[y] = []; 
        for(let x = 0; x < roomsPerSide; ++x) {
            rooms[y][x] = {
                column: x, 
                row: y, 
                active: false, 
                loci: { 
                    north: undefined, 
                    east: undefined, 
                    south: undefined, 
                    west: undefined, 
                }, 
            }; 
        }
    }
    rooms[0][0].loci.south = { 
        url: '/mnt/file.jpg', 
        ans: 'coefficient of static friction', 
        active: false, 
    }

    // INIT
    
    const roomsDom = document.createDocumentFragment('div'); 
    for(let y = 0; y < roomsPerSide; ++y) {
        for(let x = 0; x < roomsPerSide; ++x) {
            const room = document.createElement('div'); 
            room.classList.add('room'); 
            room.setAttribute('column', x); 
            room.setAttribute('row', y);
            room.setAttribute('active', false);  
            roomsDom.appendChild(room); 

            if(rooms[y][x].loci.south) {
                const loci = document.createElement('div'); 
                loci.classList.add('loci', 'loci-north'); 
                room.appendChild(loci); 
            }
        }
    }
    document.querySelector('.map').append(roomsDom); 
    
    // MAP
    
    const map_RoomsDom_To_Rooms = () => {
        document.querySelectorAll('.room').forEach(room => {
            rooms[+room.getAttribute('row')][+room.getAttribute('column')].active = room.getAttribute('active') === 'true'; 
        }); 
    }; 

    // EVENT

    const roomActivation = clickRoom => {
        const room = clickRoom.target; 

        if(room.classList.contains('room') && clickRoom.buttons === 1) {
            room.setAttribute('active', room.getAttribute('active') !== 'true'); 

            map_RoomsDom_To_Rooms(); 
            localStorage.setItem('rooms', JSON.stringify(rooms)); 
        }
    }
    document.querySelector('.map').addEventListener('mousedown', roomActivation); 
    document.querySelector('.map').addEventListener('mouseover', roomActivation); 

    // DROP FILES

    // document.querySelector('.drop-area').addEventListener('dragover', drag => {
    //     drag.stopPropagation(); 
    //     drag.preventDefault(); 
    //     console.log(drag); 

    //     drag.dataTransfer.dropEffect = 'copy'; 
    // }); 

    // document.querySelector('.drop-area').addEventListener('drop', drop => {
    //     drop.stopPropagation(); 
    //     drop.preventDefault(); 
    //     console.log('DROP EVENT', drop); 
    //     console.log(drop.dataTransfer.fileList[0]); 
    // }); 

    document.querySelector('.drop-area').addEventListener('change', change => {
        console.log(change); 
        const reader = new FileReader(); 
        reader.addEventListener('load', load => {
            const res = reader.result; 
            document.querySelector('.drop-area').style.backgroundImage = `URL("${res}")`; 
        }); 
        reader.readAsDataURL(document.querySelector('.drop-area').files[0]); 
    })

    console.log(chrome.storage.local.QUOTA_BYTES); 
}); 