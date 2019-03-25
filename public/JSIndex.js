
const SYSTEM_URL = "/MTIAPI/SYSTEM"
const RFID_URL = "/MTIAPI/RFID"
const GPIO_URL = "/MTIAPI/GPIO"
var run = false, simulationInterval;
autoRunInvData();
getNetworkInfo();
getTopicList();
getTagMap();
$.get(`${RFID_URL}/getAntenna`, {logicPort:0}, function (res) {
    if (res.data) {
        simulationInterval = res.data.dwellTime;
        $.post(`${RFID_URL}/simulation`, {data:simulationInterval});
    }
})
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
        if(res.error){
            $('#ethIP').append(" No IP response");
        } else {
            var temp = "";
            for (var i = 0; i < res.data.length; i++) {
                temp += res.data[i]["IP Address"];
            }
            $('#ethIP').append(temp);
        }
    });
}

/*
 * MQTT Topic Config
*/
function getTopicList() {
    $.get(`${SYSTEM_URL}/topicList`, function (res) {
        var temp = "";
        if(res.list){
            for (var i = 0; i < res.list.length; i++) {
                temp += `<p>${res.list[i].topic.replace('=',' : ')}</p>`;
            }
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
    simulationInterval = data.dwellTime;
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/setAntenna<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/setAntenna`, {data:JSON.stringify(data)}, function(res){
        if(res.data){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/setAntenna<br>Result : <br>${JSON.stringify(res.data)}</p>`);
            $.post(`${RFID_URL}/simulation`, {data:simulationInterval});
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
        mask: $('#mask').val(),
        sessionTarget: 2
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
$("#perfMode1").on('click', function () {
    var data = {
        mode:1
    };
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/performanceTest<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/performanceTest`, {data: JSON.stringify(data)}, function(res){
        if (res.data) {
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/performanceTest<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/performanceTest<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
})
$("#perfMode2").on('click', function () {
    var data = {
        mode:2
    };
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/performanceTest<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/performanceTest`, {data: JSON.stringify(data)}, function(res){
        if (res.data) {
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/performanceTest<br>Result : <br>${JSON.stringify(res.data)}</p>`);
        } else if(res.error){
            $('#printfResponse').prepend(`<p>From : <br>${RFID_URL}/performanceTest<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
})
/*
 * Module Inventory API
*/
function autoRunInvData() {
    setTimeout(function () {
        if(run){
            var data = {
                data: ["epc","count","rssi","uniCount","totalCount","throughput"]
            }
            $.get(`${RFID_URL}/getInvData`, data, function(res){
                if(res.data){
                    $('#printfResponse').html(`<p>From : <br>${RFID_URL}/getInvData<br>Result : <br>${JSON.stringify(res.data)}</p>`);
                } else if(res.error){
                    $('#printfResponse').html(`<p>From : <br>${RFID_URL}/getInvData<br>Result : <br>${JSON.stringify(res.error)}</p>`);
                }
            });
        }
        autoRunInvData();
    }, 1000);
}
$("a[name=invAction]").on('click', function(){
    var data = {
        action: $(this).attr('value')
    }
    $('#printfRequire').prepend(`<p>Post to : <br>${RFID_URL}/inventoryAction<br>Command : <br>${JSON.stringify(data)}</p>`);
    $.post(`${RFID_URL}/inventoryAction`, {data: JSON.stringify(data)}, function(res){
        if(res.data){
            if(data.action == 'once'){
                initScatter();
                initChart();
                setTimeout(function () {
                    charting();
                }, (simulationInterval+1000))
            }
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
$("#invDataContinuous").on('change', function () {
    if(this.checked){
        run = true;
    } else {
        run = false;
    }
})
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
                // setTimeout( function() { $("body").loading( "stop" ) }, 5000 );
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
    setTimeout( function() { window.location.reload(); }, 15000 );
});

/*
 * For Simulation Test
*/
var tagMap;
$("#TagMapImport").on('change', function(){
    var data = this;
    if (data.files && data.files[0]) {
        var reader = new FileReader();

        reader.onload = function (element) {
            xlsxFile = element.target.result;
            $.ajax({
                url: `${RFID_URL}/tagMapImport`,
                method: 'POST',
                data: xlsxFile,
                contentType: "application/octet-stream",
                processData: false,
                cache: false,
                success: function (res) {
                    $(data).val('');
                    alert(res);
                    getTagMap();
                }
            })
        }

        reader.readAsArrayBuffer(data.files[0]);
    }
});
function getTagMap(){
    $.get(`${RFID_URL}/tagMap`, function (res) {
        tagMap = res;
    });
}

/**
 * Chart.js/Canvas for data view
 */
var ctx = $('#myCanvas');
var perfChartCONF = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'uniCount',
            backgroundColor: 'red',
            borderColor: 'red',
            data: [],
            fill: false
        },{
            label: 'totalCount',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [],
            fill: false
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'seconds'
                },

            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'tag number'
                },
                ticks: {
                    max: 400,
                    min: 0,
                    stepSize: 25
                }
            }]
        }
    }
}
var perfChart = new Chart(ctx, perfChartCONF);
function initChart(){
    perfChart.data.labels = [];
    perfChart.data.datasets[0].data = [];
    perfChart.data.datasets[1].data = [];
    perfChart.update();
}
function charting() {
    $.get(`${RFID_URL}/simulation`, function(res){
        if(res.length){
            for (var i = 0; i < res.length; i++) {
                perfChart.data.labels.push((i)/10);
                perfChart.data.datasets[0].data.push(res[i].data[0].uniCount);
                perfChart.data.datasets[1].data.push(res[i].data[0].totalCount);
                scatting(res[i].data);
            }
            perfChart.update();
            scatterChart1.update();
            scatterChart2.update();
            scatterChart3.update();
            scatterChart4.update();
            scatterChart5.update();
            scatterChart6.update();
        } else if(res.error){
            $('#printfResponse').html(`<p>From : <br>${RFID_URL}/getInvData<br>Result : <br>${JSON.stringify(res.error)}</p>`);
        }
    });
}

var scatter1 = $('#scatter1');
var scatter2 = $('#scatter2');
var scatter3 = $('#scatter3');
var scatter4 = $('#scatter4');
var scatter5 = $('#scatter5');
var scatter6 = $('#scatter6');
var scatDatasets = [];
for (var i = 1; i <= 20; i++) {
    for (var j = 1; j <= 3; j++) {
        scatDatasets.push({
            label: 'Scatter Dataset',
            backgroundColor: '#FFFFFF',
            borderColor:`#E9E9E9`,
            pointRadius:15,
            borderWidth:10,
            data: [{x:j,y:i}]
        })
    }
}
var scatterChartCONF = {
    type: 'scatter',
    data: {
        // datasets: $.extend(true, [], scatDatasets)
        datasets:[]
    },
    options: {
        legend: {
            display: false,
        },
        layout: {
            padding: {
                left: 0,
                right: 20,
                top: 20,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                ticks: {
                    max: 3,
                    min: 1,
                    stepSize: 1
                }
            }],
            yAxes: [{
                ticks: {
                    max: 20,
                    min: 1,
                    stepSize: 1
                }
            }]
        }
    }
}
var scatterChart1 = new Chart(scatter1, JSON.parse(JSON.stringify(scatterChartCONF)));
var scatterChart2 = new Chart(scatter2, JSON.parse(JSON.stringify(scatterChartCONF)));
var scatterChart3 = new Chart(scatter3, JSON.parse(JSON.stringify(scatterChartCONF)));
var scatterChart4 = new Chart(scatter4, JSON.parse(JSON.stringify(scatterChartCONF)));
var scatterChart5 = new Chart(scatter5, JSON.parse(JSON.stringify(scatterChartCONF)));
var scatterChart6 = new Chart(scatter6, JSON.parse(JSON.stringify(scatterChartCONF)));
initScatter();
function initScatter() {
    scatterChart1.data.datasets = JSON.parse(JSON.stringify(scatDatasets));
    scatterChart2.data.datasets  = JSON.parse(JSON.stringify(scatDatasets));
    scatterChart3.data.datasets  = JSON.parse(JSON.stringify(scatDatasets));
    scatterChart4.data.datasets  = JSON.parse(JSON.stringify(scatDatasets));
    scatterChart5.data.datasets  = JSON.parse(JSON.stringify(scatDatasets));
    scatterChart6.data.datasets  = JSON.parse(JSON.stringify(scatDatasets));
    scatterChart1.update();
    scatterChart2.update();
    scatterChart3.update();
    scatterChart4.update();
    scatterChart5.update();
    scatterChart6.update();
}
function scatting(data){
    for (var i = 1; i < data.length; i++) {
        let epc = data[i].invData, block = 0, index = 0;
        if (tagMap[epc]) {
            block = parseInt(tagMap[epc]/60);
            index = tagMap[epc]%60;
            switch (block) {
                case 0:
                    if (data[i].logicAnt === 1) {
                        scatterChart1.data.datasets[index].backgroundColor = '#ffe600';
                    } else if (data[i].logicAnt === 3) {
                        scatterChart1.data.datasets[index].borderColor = '#74cf00';
                    }
                    break;
                case 1:
                    if (data[i].logicAnt === 1) {
                        scatterChart2.data.datasets[index].backgroundColor = '#ffe600';
                    } else if (data[i].logicAnt === 3) {
                        scatterChart2.data.datasets[index].borderColor = '#74cf00';
                    }
                    break;
                case 2:
                    if (data[i].logicAnt === 1) {
                        scatterChart3.data.datasets[index].backgroundColor = '#ffe600';
                    } else if (data[i].logicAnt === 3) {
                        scatterChart3.data.datasets[index].borderColor = '#74cf00';
                    }
                    break;
                case 3:
                    if (data[i].logicAnt === 1) {
                        scatterChart4.data.datasets[index].backgroundColor = '#ffe600';
                    } else if (data[i].logicAnt === 3) {
                        scatterChart4.data.datasets[index].borderColor = '#74cf00';
                    }
                    break;
                case 4:
                    if (data[i].logicAnt === 1) {
                        scatterChart5.data.datasets[index].backgroundColor = '#ffe600';
                    } else if (data[i].logicAnt === 3) {
                        scatterChart5.data.datasets[index].borderColor = '#74cf00';
                    }
                    break;
                case 5:
                    if (data[i].logicAnt === 1) {
                        scatterChart6.data.datasets[index].backgroundColor = '#ffe600';
                    } else if (data[i].logicAnt === 3) {
                        scatterChart6.data.datasets[index].borderColor = '#74cf00';
                    }
                    break;
            }
        }
    }
}
