归纳工作中使用频率较高的工具类函数，以便于其他项目复用。

### 文件结构
- .vscode 配置了launch快捷调试和babel watch 编译的task
- demo 文件夹用于开发调试
- doc 生成的doc文档
- src 源文件，其中index文件为统一出口，也可以按需引用
- test 测试文件，每个源文件对应一份测试文件
- test_report 测试报告

### 配套工具
1. 工具函数 ok
2. 测试用例 ok
3. 更新docs文档 ok

### 开发流程
1. 源文件采用 ES6 模块化方案，根据方法的作用放在不同的文件中
2. 方法需要有标注注释，用于生成文档
3. 方法需要有对应的测试用例，方法覆盖率须达到 100% ，测试用例尽可能涵盖多种情况
4. 为了便于开发和调试，可先启动 task:npm ，在 demo/index 中编写测试代码

### nginx 配置
为了便于查看接口文档和测试报告，所以用nginx做简单的文件服务器
```config
server {
    listen     6060;
    server_name localhost;
    root D:\\mycode\\js-util-func;
    # index index.html;
    location /docs/ {
        autoindex on;
    }
    location /test_report/mocha/ {
        index mochawesome.html;
        autoindex on;
    }
    location /test_report/nyc/ {
        autoindex on;
    }
}
```