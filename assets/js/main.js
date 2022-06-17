window.onload = function(){
	//Values
    let form_Block = document.getElementsByClassName('form-block')[0];
    let form_Block_Form = form_Block.getElementsByTagName('form')[0];
    let form_Submit_Btn = form_Block_Form.getElementsByClassName('submit-form')[0];
    let result_Block = document.getElementsByClassName('result-block')[0];
    let result_Table = result_Block.getElementsByTagName('table')[0];
    let result_Table_Body = result_Table.getElementsByTagName('tbody')[0];

    //Parse
    form_Block_Form.onsubmit = function(){

        //Prevent redirect browser
        event.preventDefault();

        //Disable submit-button
        form_Submit_Btn.disabled = true;

        //Parse
        parse(this);
    }

    function parse(data){
        //Prepare request
        let xhr = new XMLHttpRequest();
        data = new FormData(data);
        xhr.open('post', 'assets/php/parser.php');
        xhr.responseType = 'json';

        xhr.onload = function(){

            //Active submit-button
            form_Submit_Btn.disabled = false;

            let response = this.response;
            //If empty response
            if((response == null)){
                return false;
            }

            //Update table
            updateTable(response);
        };
        
        //Send request
        xhr.send(data);
    }

    function updateTable(response){
        //Clear table body
        result_Table_Body.innerHTML = '';
        //Add new rows
        for(let i = 0; i < response.length; i++){

            //Create table row
            let row = document.createElement('tr');

            //Add name
            let name = document.createElement('td');
            name.innerHTML = response[i][2];
            row.appendChild(name);

            //Add perfomer
            let perfomer = document.createElement('td');
            perfomer.innerHTML = response[i][3];
            row.appendChild(perfomer);

            //Add link
            let link = document.createElement('td');
            let aLink = document.createElement('a');
            aLink.href = 'https://drivemusic.club' +  response[i][1];
            aLink.innerHTML = 'https://drivemusic.club' +  response[i][1];
            link.appendChild(aLink);
            row.appendChild(link);

            //Add audio-player
            let audio = document.createElement('td');
            let audioPlayer = document.createElement('audio');
            audioPlayer.controls = 1;
            audioPlayer.src = response[i][0];
            audio.appendChild(audioPlayer);
            row.appendChild(audio);

            result_Table_Body.appendChild(row);
        }
    }

};