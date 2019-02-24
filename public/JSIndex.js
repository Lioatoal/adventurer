
const SYSTEM_URL = "/MTIAPI/SYSTEM"
const RFID_URL = "/MTIAPI/RFID"
const GPIO_URL = "/MTIAPI/GPIO"

getNetworkInfo();
getTopicList();
$("#clear").on('click', function () {
    $('#printfRequire').html('');
    $('#printfResponse').html('');
});

/*
 * System Information API
*/
function getNetworkInfo(){
    var networkList = [];
    networkList.push({interface:"eth0"});
    $.get(`${SYSTEM_URL}/getNetworkInfo`, {data:JSON.stringify(networkList)}, function (res) {
        var temp = "";
        for (var i = 0; i < res.data.length; i++) {
            temp += res.data[i]["IP Address"];
        }
        $('#ethIP').append(temp);
    });
}

/*
 * MQTT Topic Config
*/
function getTopicList() {
    $.get(`${SYSTEM_URL}/topicList`, function (res) {
        var temp = "";
        for (var i = 0; i < res.list.length; i++) {
            temp += `<p>${res.list[i].topic.replace('=',' : ')}</p>`;
        }
        $('#topicList').html(temp);
    });
}
$("#submitTopic").on('click', function () {
    $("body").loading({
        theme: 'light'
    });
    var topic = {
        topic: $('#defTopic').val()
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${SYSTEM_URL}/topicConf<br>Command : <br>${JSON.stringify({data:topic})}</p>`);
    $.post(`${SYSTEM_URL}/topicConf`, {data: JSON.stringify(topic)}, function (res) {
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/topicConf<br>Result : <br>${JSON.stringify(res.data)}</p>`);
            getTopicList();
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/topicConf<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
   })
   setTimeout( function() { window.location.reload(); }, 5000 );
})

/*
 * Sensor Control API
*/
$('#rfidSensorEnable').on('click', function () {
    $("body").loading({
        theme: 'light'
    });
    var data = []
    data.push({
        sensorID:"RFID",
        status:"enable",
        exec:"adv_rfidM03.service"
    })
    $('#printfRequire').prepend(`<p>Post to : <br>${SYSTEM_URL}/sensorConf<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${SYSTEM_URL}/sensorConf`, {data:JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
       setTimeout( function() { $("body").loading( "stop" ) }, 1000 );
    });
});
$('#rfidSensorDisable').on('click', function () {
    $("body").loading({
        theme: 'light'
    });
    var data = [];
    data.push({
        sensorID:"RFID",
        status:"disable",
        exec:"adv_rfidM03.service"
    });
    $('#printfRequire').prepend(`<p>Post to : <br>${SYSTEM_URL}/sensorConf<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${SYSTEM_URL}/sensorConf`, {data:JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
       setTimeout( function() { $("body").loading( "stop" ) }, 1000 );
    });
});
$('#gpioSensorEnable').on('click', function () {
    $("body").loading({
        theme: 'light'
    });
    var data = []
    data.push({
        sensorID:"GPIO",
        status:"enable",
        exec:"adv_gpio.service"
    })
    $('#printfRequire').prepend(`<p>Post to : <br>${SYSTEM_URL}/sensorConf<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${SYSTEM_URL}/sensorConf`, {data:JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
       setTimeout( function() { $("body").loading( "stop" ) }, 1000 );
    });
});
$('#gpioSensorDisable').on('click', function () {
    $("body").loading({
        theme: 'light'
    });
    var data = []
    data.push({
        sensorID:"GPIO",
        status:"disable",
        exec:"adv_gpio.service"
    })
    $('#printfRequire').prepend(`<p>Post to : <br>${SYSTEM_URL}/sensorConf<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${SYSTEM_URL}/sensorConf`, {data:JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${SYSTEM_URL}/sensorConf<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
       setTimeout( function() { $("body").loading( "stop" ) }, 1000 );
    });
});

/*
 * GPIO API
*/
$("#gpioList").on('click', function () {
    var data = {
        command : "list"
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${GPIO_URL}/command<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.get(`${GPIO_URL}/command`, data, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/command<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/command<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
$("#gpioConfig").on('click', function () {
    var data = [];
    data.push({
        gpioNum : "34",
        direction: $('#direction').val(),
        value: $('#value').val()
    });
    $('#printfRequire').prepend(`<p>Post to : <br>${GPIO_URL}/gpioConf<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${GPIO_URL}/gpioConf`, {data: JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/gpioConf<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/gpioConf<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
$("#gpioEnable").on('click', function () {
    var data = [];
    data.push({
        gpioNum : "34",
        status: "enable"
    });
    $('#printfRequire').prepend(`<p>Post to : <br>${GPIO_URL}/gpioStatus<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${GPIO_URL}/gpioStatus`, {data: JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/gpioStatus<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/gpioStatus<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
$("#gpioDisable").on('click', function () {
    var data = [];
    data.push({
        gpioNum : "34",
        status: "disable"
    });
    $('#printfRequire').prepend(`<p>Post to : <br>${GPIO_URL}/gpioStatus<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${GPIO_URL}/gpioStatus`, {data: JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/gpioStatus<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${GPIO_URL}/gpioStatus<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});

/*
 * Module Configuration API
*/
$("#getAntenna").on('click', function(){
    var data = {
        logicPort:0
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/getAntenna<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.get(`${RFID_URL}/getAntenna`, data, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getAntenna<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getAntenna<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
    });
});
$("#setAntenna").on('click', function(){
    var data ={
        logicPort:0,
        status:1,
        physicalPort:0,
        dwellTime: parseInt($('#dwellTime').val()),
        cycle: parseInt($('#cycle').val()),
        power: parseInt($('#power').val()),
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/setAntenna<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/setAntenna`, {data:JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/setAntenna<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/setAntenna<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
    });
});
$("a[name=getAlgorithm]").on('click', function(){
    var data = {
        type: $(this).attr('value')
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/getAlgorithm<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.get(`${RFID_URL}/getAlgorithm`, data, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getAlgorithm<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getAlgorithm<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
$("a[name=setAlgorithm]").on('click', function(){
    var data;
    if ($(this).attr('value') === 'fixedQ') {
        data ={
           type: $(this).attr('value'),
           QValue: parseInt($('input[name=fixedQ][id=QValue]').val()),
           retryCount: parseInt($('input[name=fixedQ][id=retryCount]').val()),
           toggleTarget: parseInt($('input[name=fixedQ][id=toggleTarget]').val()),
           repeatUntilNoTags: parseInt($('input[name=fixedQ][id=repeatUntilNoTags]').val())
       }
    } else if($(this).attr('value') === 'dynamicQ'){
        data ={
           type: $(this).attr('value'),
           startQValue: parseInt($('input[name=dynamicQ][id=startQValue]').val()),
           minQValue: parseInt($('input[name=dynamicQ][id=minQValue]').val()),
           maxQValue: parseInt($('input[name=dynamicQ][id=maxQValue]').val()),
           retryCount: parseInt($('input[name=dynamicQ][id=retryCount]').val()),
           toggleTarget: parseInt($('input[name=dynamicQ][id=toggleTarget]').val()),
           thresholdMultiplier: parseInt($('input[name=dynamicQ][id=thresholdMultiplier]').val())
       }
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/setAlgorithm<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/setAlgorithm`, {data:JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/setAlgorithm<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
           $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/setAlgorithm<br>Result : <br>${JSON.stringify(res.error)}</p>`);
       }
    });
});
$("#getMask").on('click', function () {
    var data = {
        index:0
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/getMask<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.get(`${RFID_URL}/getMask`, data, function(res){
        if (res.data) {
            var dataHex = JSON.parse(JSON.stringify(res.data));
            for (var i = 0; i < dataHex.mask.length; i++) {
                dataHex.mask[i]= dataHex.mask[i].toString(16);
            }
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getMask<br>Result : <br>${JSON.stringify(res.data)}<br>${JSON.stringify(dataHex)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getMask<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
$("#setMask").on('click', function () {
    var data = {
        index:0,
        status: "enable",
        mask: $('#mask').val()
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/setMask<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/setMask`, {data: JSON.stringify(data)}, function(res){
        if (res.data) {
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/setMask<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/setMask<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
/*
 * Module Inventory API
*/
$("a[name=invAction]").on('click', function(){
    var data = {
        action: $(this).attr('value')
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/inventoryAction<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/inventoryAction`, {data: JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/inventoryAction<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/inventoryAction<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
$("a[name=invData]").on('click', function (){
    var data = {
        data: $(this).attr('value').split("/")
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/getInvData<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.get(`${RFID_URL}/getInvData`, data, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getInvData<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/getInvData<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
/*
 * Module Tag Access API
*/
$("#readTag").on('click', function () {
    var data = {
        bank: parseInt($('#readBank').val()),
        offset: parseInt($('#readOffset').val()),
        count: parseInt($('#readCount').val())
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/readTag<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/readTag`, {data: JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/readTag<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/readTag<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});
$("#writeTag").on('click', function () {
    var data = {
        bank: parseInt($('#writeBank').val()),
        offset: parseInt($('#writeOffset').val()),
        data: $('#writeData').val()
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/writeTag<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/writeTag`, {data: JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/writeTag<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/writeTag<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
});

/*
 * Software Update API
*/
$("form").on('submit', function () {
    event.preventDefault();

    $("body").loading({
        theme: 'light'
    });
    $('#printfRequire').prepend(`<p>Post to : <br>/MTIAPI/SYSTEM/upgrade<br>Command : <br>none</p>`);

    var formData = new FormData(this);
    $.ajax({
        type: 'post',
        url: '/MTIAPI/SYSTEM/upgrade',
        data: formData,
        mimeType: "multipart/form-data",
        contentType: false,
        cache: false,
        processData: false,
        success: function(res) {
            res = JSON.parse(res);
            if(res.data){
                $('#printfResponse').prepend(`<p>From : <br>/MTIAPI/SYSTEM/upgrade<br>Result : <br>${JSON.stringify(res.data)}</p>`);
                setTimeout( function() { $("body").loading( "stop" ) }, 5000 );
            } else if(res.error){
                $('#printfResponse').prepend(`<p>From : <br>/MTIAPI/SYSTEM/upgrade<br>Result : <br>${JSON.stringify(res.error)}</p>`);
                setTimeout( function() { $("body").loading( "stop" ) }, 3000 );
            }
        },
        statusCode: {
            500: function (res) {
                $('#printfResponse').prepend(`<p>From : <br>/MTIAPI/SYSTEM/upgrade<br>Result : <br>${res.responseText}</p>`);
                setTimeout( function() { $("body").loading( "stop" ) }, 3000 );
            }
        }
    });
    setTimeout( function() { window.location.reload(); }, 5000 );
})
