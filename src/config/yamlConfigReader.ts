/**
 * @author sizhong
 * @date 2023-05-10
 */
/*
 * yaml 配置
 * */
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yaml';

export const loadYamlConfig = () => {
    return yaml.load(
        readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
    ) as Record<string, any>;
};

// 使用 yaml 配置时注意：nest cli 默认不会将非 ts 文件复制到 dist 目录中，需要在 nest-cli.json 中配置如下：
// "assets": [
//             {
//                 "include": "./config/*.yaml", // 相对于 src 目录, 若 config 目录与 src 同级。 则应该为 ../config/*.yaml
//                 "outDir": "./dist"
//             }
//         ]
