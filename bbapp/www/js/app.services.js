angular.module('app.services', [])
    .constant('apiContext', 'http://1616d788a5.iok.la')

    /*'http://1616d788a5.iok.la:32118/''http://192.168.1.101/'*/
    .factory('Chats', function ($http) {

        var chats = [
            [{
                "FlightId": 3,
                "flightName": "CA1432",
                "flightState": "登机结束",
                "isbutton": false,
                "bridgeId": 2,
                "bridgeName": "bg1",
                "flightTime": "1970-01-01T00:13:59.000+0800"
            }, {
                "FlightId": 5,
                "flightName": "CH5435",
                "flightState": "操作状态",
                "isbutton": true,
                "bridgeId": 3,
                "bridgeName": "bg2",
                "flightTime": "1970-01-01T00:15:22.000+0800"
            }, {
                "FlightId": 6,
                "flightName": "CV5433",
                "flightState": "等待",
                "isbutton": false,
                "bridgeId": 3,
                "bridgeName": "bg2",
                "flightTime": "1970-01-01T02:15:59.000+0800"
            }, {
                "FlightId": 4,
                "flightName": "BH5366",
                "flightState": "等待",
                "isbutton": false,
                "bridgeId": 2,
                "bridgeName": "bg1",
                "flightTime": "1970-01-01T04:22:22.000+0800"
            }, {
                "FlightId": 1,
                "flightName": "VH5673",
                "flightState": "等待",
                "isbutton": false,
                "bridgeId": 1,
                "bridgeName": "bg0",
                "flightTime": "1970-01-01T20:13:59.000+0800"
            }, {
                "FlightId": 2,
                "flightName": "FG5632",
                "flightState": "等待",
                "isbutton": false,
                "bridgeId": 1,
                "bridgeName": "bg0",
                "flightTime": "1970-01-01T21:06:59.000+0800"
            }, {
                "FlightId": 5,
                "flightName": "GH5435",
                "flightState": "等待",
                "isbutton": false,
                "bridgeId": 8,
                "bridgeName": "bg2",
                "flightTime": "1970-01-01T00:15:22.000+0800"
            }, {
                "FlightId": 6,
                "flightName": "CV5983",
                "flightState": "等待",
                "isbutton": false,
                "bridgeId": 3,
                "bridgeName": "bg2",
                "flightTime": "1970-01-01T02:15:59.000+0800"
            }]
        ];

        var Bridges = [
            [{
                "BridgeId": 1,
                "BridgeState": 1,
            }, {
                "BridgeId": 2,
                "BridgeState": 2,
            }, {
                "BridgeId": 3,
                "BridgeState": 3,
            }, {
                "BridgeId": 4,
                "BridgeState": 1,
            }, {
                "BridgeId": 5,
                "BridgeState": 1,
            }, {
                "BridgeId": 6,
                "BridgeState": 1,
            }, {
                "BridgeId": 7,
                "BridgeState": 1,
            }, {
                "BridgeId": 8,
                "BridgeState": 1,
            }, {
                "BridgeId": 9,
                "BridgeState": 1,
            }, {
                "BridgeId": 10,
                "BridgeState": 1,
            }, {
                "BridgeId": 11,
                "BridgeState": 1,
            }, {
                "BridgeId": 12,
                "BridgeState": 1,
            }, {
                "BridgeId": 13,
                "BridgeState": 1,
            }, {
                "BridgeId": 14,
                "BridgeState": 1,
            }, {
                "BridgeId": 15,
                "BridgeState": 1,
            }, {
                "BridgeId": 16,
                "BridgeState": 1,
            }, {
                "BridgeId": 17,
                "BridgeState": 1,
            }, {
                "BridgeId": 18,
                "BridgeState": 1,
            }, {
                "BridgeId": 19,
                "BridgeState": 1,
            }, {
                "BridgeId": 20,
                "BridgeState": 1,
            }, {
                "BridgeId": 21,
                "BridgeState": 1,
            }, {
                "BridgeId": 22,
                "BridgeState": 1,
            }, {
                "BridgeId": 23,
                "BridgeState": 1,
            }, {
                "BridgeId": 24,
                "BridgeState": 1,
            }, {
                "BridgeId": 25,
                "BridgeState": 1,
            }, {
                "BridgeId": 26,
                "BridgeState": 1,
            }, {
                "BridgeId": 27,
                "BridgeState": 1,
            }, {
                "BridgeId": 28,
                "BridgeState": 1,
            }, {
                "BridgeId": 29,
                "BridgeState": 1,
            }, {
                "BridgeId": 30,
                "BridgeState": 1,
            }, {
                "BridgeId": 31,
                "BridgeState": 1,
            }, {
                "BridgeId": 32,
                "BridgeState": 1,
            }]
        ];

        var Messages = [
            [{
                "messageId": 1,
                "messageText": "航班FD9845还有15分钟落地",
                "messageType": 1,
                "messageTime": 1,
                "messageState": 1,
                "userId": 2,
                "bridgeName": "bg1",
                "flightName": "FD9845",
                "created": "2016-01-22T16:40:34.000+0800"
            }, {
                "messageId": 2,
                "messageText": "MU5130晚点，预计将于13:17抵达8号登机口",
                "messageType": 2,
                "messageTime": 1,
                "messageState": 1,
                "userId": 2,
                "bridgeName": "bg8",
                "flightName": "MU5130",
                "created": "2016-01-22T16:40:34.000+0800"
            }, {
                "messageId": 3,
                "messageText": "KN5987已经落地，请做好接机准备",
                "messageType": 3,
                "messageTime": 1,
                "messageState": 1,
                "userId": 2,
                "bridgeName": "bg5",
                "flightName": "KN5987",
                "created": "2016-01-22T16:40:34.000+0800"
            }, {
                "messageId": 4,
                "messageText": "KN5987登记剩余低于10人",
                "messageType": 4,
                "messageTime": 1,
                "messageState": 1,
                "userId": 2,
                "bridgeName": "bg3",
                "flightName": "KN5987",
                "created": "2016-01-22T16:40:34.000+0800"
            }, {
                "messageId": 5,
                "messageText": "KN5987登机结束",
                "messageType": 5,
                "messageTime": 1,
                "messageState": 1,
                "userId": 2,
                "bridgeName": "bg5",
                "flightName": "KN5987",
                "created": "2016-01-22T16:40:34.000+0800"
            }]
        ];
        return {
            all: function () {
                return chats;
            },
            text: function () {
                return Messages;
            },
            bridge: function () {
                return Bridges;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (MessageId) {
                for (var i = 0; i < Messages[0].length; i++) {
                    if (Messages[0][i].messageId === parseInt(MessageId)) { /*有问题*/
                        return Messages[0][i];
                    }
                }
                return null;
            }
        };
    })

    .factory('locals', ['$window', function ($window) {
        return {
            //存储单个属性
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            //读取单个属性
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //存储对象，以JSON格式存储
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            //读取对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }

        }
    }])

    .factory('bell', function () {
        var repeat = 0;
        var soundFile = '/android_asset/www/media/music.mp3';
        var myBell = new Media(soundFile, function () {
                console.info("bell rang.");
            },
            function (err) {
                console.log("Bell failed: " + err);
            },
            function (status) {
                if (repeat > 0 && status == Media.MEDIA_STOPPED) {
                    --repeat;
                    myBell.play();
                }
            }
        );

        var myNativeBell = window.plugins.NativeAudio.preloadComplex(
            'myNativeBell', 'media/music.mp3', 1, 1, 0,
            function (msg) {
                console.log('load native audio succeeded: ' + msg);
            },
            function (msg) {
                console.log('load native audio failed: ' + msg);
            });

        return {
            ring: function (infinite) {
                !!infinite && (repeat = 12 * 30);
                //myBell.play();
                myNativeBell.play("myNativeBell", undefined, undefined, function complete() {
                    if (repeat > 0) {
                        --repeat;
                        myNativeBell.play("myNativeBell", undefined, undefined, complete);
                    }
                })
            },
            stop: function () {
                repeat = 0;
                //myBell.stop();
                myNativeBell.stop();
            },
            vibrate: function () {
                navigator.vibrate && navigator.vibrate(5000);
            }
        }
    })
