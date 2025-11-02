import mqttAsync from "@normalized:Y&&&libmqttasync.so&";
import { LogUtil } from "@normalized:N&&&@ohos/mqtt/src/main/ets/components/util/LogUtil&2.0.24";
import type { MqttClientOptions, MqttClient } from "@normalized:Y&&&libmqttasync.so&";
class MqttAsync {
    static DOMAIN = 0x00FF;
    static TAG = '[mqtt] mqttAsync: ';
    public static createMqtt(options: MqttClientOptions): MqttClient {
        LogUtil.info('AsyncMqtt createMqtt_napi start');
        return mqttAsync.createMqttSync(options);
    }
    ;
}
export default MqttAsync;
