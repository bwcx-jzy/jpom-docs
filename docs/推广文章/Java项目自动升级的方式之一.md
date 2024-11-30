---
title: 探索 Java 项目如何实现自动升级
date: 2024-03-02 12:02:22
permalink: /pages/c270ce/
categories:
  - docs
  - 推广文章
tags:
  - 推广文章
---

![banner](/images/tutorial/f606531a8b16b027e7dd2b8d14d752a63c332e96.jpg)

📖本文将以 [Jpom](https://jpom.top) 为实际案例分享在 Java 项目中如何实现自动升级的功能。本文满满的干货，希望对大家有所启发或者帮助 🤔。

💡文章预计阅读时长：15 ~ 20 分钟，建议先收藏再阅读避免后续找不到

## Jpom 简介 📰

🚀 [Jpom](https://jpom.top) 是一款开源的项目运维系统，主要面向中小型企业团队，提供项目日常的部署、构建、脚本管理、SSH终端、Docker UI 等功能。

🚀 [Jpom](https://jpom.top) 更是一款原生 ops 软件，给您带来了万物皆可脚本化的体验。

### 目前用户 🔥

根据目前的用户反馈+公开数据统计（保守估计）：

1. 目前用户（公司）已经达 **500+**
2. 涉及服务器已经达 **3000+**

数据并且还在不断增加中

- Jpom 仓库：[https://gitee.com/dromara/Jpom](https://gitee.com/dromara/Jpom)
- Jpom 文档：[https://jpom.top](https://jpom.top)

## 升级背景 💬

日常使用很多桌面软件，都会遇到软件升级的情况。绝大多数的软件均支持弹窗提示新版本并且点击升级按钮后自动完成整个升级流程，让用户无须过多操作即可，满满的便利性。

但是在我们 Java 程序中实现类似的功能的软件项目不是很多，其中不泛一些客观因素不需要此功能，但是在一些小项目、公司内部项目、开源项目中，此功能还是能给使用者（用户）带来极大的便利性。

### Java 项目的局限性 ❗

通常一个 Java 项目在服务器中运行时是独立运行的，没有守护程序或者其他进程来监控和管理（ _如果可以靠守护程序和监管程序升级方式可以更多样化，此方式不在本地讨论范畴中_ ）。

这样的场景要实现升级就存在一个局限性，程序必须自身控制关闭自身并且启动新的程序包，但 Jpom 经过多版本和不同用户使用场景实践后发现 Java 项目也能轻松实现自动升级。

### Jpom 中支持的升级方式有 🔖

1. 在线升级
2. 上传升级
3. 手动升级

- 在线升级和上传升级的原理是一致的，更新程序包的来源方式不一致。
- 在线升级是自动下载新的程序包、上传升级是手动上传新的程序包到系统中。
- 手动升级是最原始的大家平常使用的升级方式：手动下载新的程序包、手动上传新的程序包到服务器中。

Jpom 升级文档：[文档](/pages/FQA/upgrade/)

## 升级前提 📌

不同软件的使用场景、用户群体、整体架构等不同，导致部分软件是不能使用自动升级的方式（ _不能使用自动升级的细节情况不在本文讨论范畴中_ ）。

一般来说可以实现自动升级的软件有如下特点：

- 独立运行：项目本身是单机运行的，不涉及到分布式集群。
- 依赖简单：项目不依赖过多的外部组件。
- 业务平滑：业务逻辑变更不会影响旧版本数据的兼容性。
- 环境稳定：项目运行环境相对稳定，无需频繁调整配置。

### 通用升级流程 🏗

1. 检查是否有新版本；
2. 判断是否可以平滑升级；
3. 下载/上传升级包；
4. 执行升级流程；
   - 数据升级
   - 程序包升级
5. 等待升级结果。

## 程序变动 🛠

如果需要使用 Java 实现自动升级那么您需要对程序做如下变动调整：

1. 程序能自动升级数据库表结构（核心变动）
2. 需要将您的程序调整为脚本控制（大多数程序均是如此）
3. 程序能兼容不同版本的配置文件（向下兼容）
4. 实现升级的业务流程（一般是 web 项目需要管理页面）

### 数据库 💿

> 数据库表结构升级是实现自动升级的核心问题，如果您的项目不使用数据库可以忽略此环节。

大多数软件的版本升级均是提前手动处理数据库表结构，然后在手动升级（替换）程序包

要实现自动升级就必须解决数据库表结构升级的问题。

数据库表结构升级自动化解决办法通常可以使用第三方工具，
如 [FlyWay](https://flywaydb.org/)、[Liquibase](https://github.com/liquibase/liquibase) 等 
（ _本文主要使用 Jpom 作为案例，使用工具库不在本文讨论范畴_）。

如果您的程序规模和复杂度不高，可以考虑自研实行数据库表结构升级。

Jpom 中目前就是采用自研实现的数据库升级（Jpom 中目前并未考虑回退版本的情况）

实现思路：（如有不足还请帮忙更正）

1. CSV 记录数据库表结构
2. 程序启动时读取 CSV 文件
3. 解析为数据库的 DLL 语句
4. 判断是否以及执行过
5. 执行 DLL 语句
6. 缓存成功执行的 DLL 语句

#### CSV 规范 📑

这里我们提前规划好完整的表、后期修改的表 、变更表索引、需要执行的扩展 SQL，可以总结为四大类型：`新增表`、`修改表`、`创建/修改索引`、`扩展 SQL`

> 下列定义的 CSV 规范仅供参考实际需要根据您的业务情况和数据库进行适当调整
> 
> Jpom 中目前仅兼容了 H2、Mysql 数据库

**Jpom 中新增表规则示例**

<div style="overflow-x: auto;">

| tableName   | name             | type   | len | defaultValue | notNull | primaryKey | comment | tableComment |
|-------------|------------------|--------|-----|--------------|---------|------------|---------|--------------|
| SCRIPT_INFO | id               | String | 50  |              | true    | true       | id      | 节点脚本模版       |
| SCRIPT_INFO | createTimeMillis | Long   |     |              | false   | false      | 数据创建时间  |
| SCRIPT_INFO | modifyTimeMillis | Long   |     |              | false   | false      | 数据修改时间  |
| SCRIPT_INFO | modifyUser       | String | 50  |              | false   | false      | 修改人     |

</div>

**Jpom 中修改表规则示例**

<div style="overflow-x: auto;">

| alterType | tableName             | name         | type   | len | defaultValue | comment  | notNull |
|-----------|-----------------------|--------------|--------|-----|--------------|----------|---------|
| ADD       | PROJECT_INFO          | triggerToken | String | 100 |              | 触发器token |
| ALTER     | FILE_STORAGE          | name         | String | 255 |              | 名称       | true    |
| DROP      | SSHTERMINALEXECUTELOG | optTime      |

</div>

**Jpom 中索引规则示例**

<div style="overflow-x: auto;">

| indexType  | tableName           | name                 | field                |
|------------|---------------------|----------------------|----------------------|
| ADD-UNIQUE | USER_INFO           | USER_INF_SALT_INDEX1 | salt                 |
| ADD        | STATIC_FILE_STORAGE | DIR_TASK_ID          | staticDir+scanTaskId |
| ADD        | TRIGGER_TOKEN_LOG   | TRIGGER_TOKEN_TYPE   | type                 |

</div>

**Jpom 中扩展 SQL 规则**

如果数据库在一定情况下需要执行一些初始化操作，版本变更需要对数据进行默认操作或者批量修改、删除、新增等
您可以使用扩展 SQL 来实现，扩展 SQL 唯一需要注意的就是分割符了，因为 JDBC 批量执行多条 SQL 只会执行第一条，后续的将自动忽略，需要您自行分割后再执行。

在 Jpom 中为了保证 DLL 语句重复执行不报错，或者减少不必要的 DLL 语句执行，在`添加字段`、`删除字段`、`删除索引`操作时候依赖数据库函数实现，此时就需要提前执行创建函数的 SQL,来达到后续操作可以顺利执行。

参考 SQL：[https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/resources/sql-view/execute.mysql.v1.0.sql](https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/resources/sql-view/execute.mysql.v1.0.sql)

#### 缓存 DLL 记录 🧾

大多数数据库 DLL 语句并不是幂等的，多次执行同一个 DLL 语句可能会报错，这样就是我们非常不期望出现的。

推荐方案在执行 DLL 语句前将签名一次（`MD5`、`SHA1`）,判断签名后的值是否以及被执行过，如果没有执行则执行并缓存成功。


Jpom 相关代码参考地址：

1. [https://gitee.com/dromara/Jpom/tree/master/modules/server/src/main/resources/sql-view](https://gitee.com/dromara/Jpom/tree/master/modules/server/src/main/resources/sql-view)
2. [https://gitee.com/dromara/Jpom/blob/master/modules/storage-module/storage-module-common/src/main/java/org/dromara/jpom/db/IStorageSqlBuilderService.java](https://gitee.com/dromara/Jpom/blob/master/modules/storage-module/storage-module-common/src/main/java/org/dromara/jpom/db/IStorageSqlBuilderService.java)
3. [https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/java/org/dromara/jpom/system/db/InitDb.java](https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/java/org/dromara/jpom/system/db/InitDb.java)


### 管理脚本 🧩

在管理 Java 项目的脚本通常要考虑实现：对应的项目启动、停止、重启、查询状态。

要实现自动升级其实我们只需要在您原有的管理脚本中调整启动环节即可，主要需要考虑如何识别到新版本的程序包、项目的控制台日志文件使用的路径即可。

管理脚本会业务不同使用环境有所不同 Linux、Windows（一定要注意文件句柄被占用的情况）、MacOS 等等，所以我们需要根据不同的操作系统来编写不同的管理脚本。


#### 实现方案 👏

1. 替换管理脚本中的值（较复杂）
2. 自动读取标记文件（推荐）

> 如有更优方案恳请分享
> 
> Jpom 中早期版本使用的是方案 1，后期版本使用的是方案 2。


方案一的缺点：程序需要修改管理脚本文件，容易产生修改前后编码格式不一致，脚本规则定义不明确会出现难替换问题


#### 推荐实现 👍

我们推荐您使用标记文件的方案来实现，主要流程如下：

在管理脚本启动流程（函数）读取标记文件中的值来来运行程序。

假设我们管理脚本定义来如下变量：

```shell
Lib="${base}/lib/"
LogPath="${base}/logs/"
RUN_JAR=""
Log="${LogPath}/stdout.log"
```

当我们在启动时候先判断标记文件是否存在（假设这里我们定义标记文件为：`run.bin`），
如果存在标记文件我们则读取这个文件里面的值并将其赋值给 `RUN_JAR` 变量，
如果不存在标记文件表示第一次启动，我们建议您读取 Lib 目录下面的第一个 jar 包并将其赋值给 `RUN_JAR` 变量，
如果 Lib 目录下面没有 jar 包，则表示没有可运行的程序，程序启动失败。

经过上述流程我们即可拼接最终的启动命令。

`nohup java -server -XX:+UseG1GC XXXX -jar ${Lib}/${RUN_JAR} XXXX >>$Log 2>&1 &`

如果您是 classpath 模式运行其实类似的方式只能需要修改生成所有的 jar 全路径和最终的启动命令即可。

Jpom 中的实现函数截取示例（Linux）：

```shell
function checkConfig() {
	if [[ -z "${RUN_JAR}" ]]; then
		if [ -f "$Lib/run.bin" ]; then
			RUN_JAR=$(cat "$Lib/run.bin")
			if [ ! -f "$Lib/$RUN_JAR" ]; then
				errorExit "Cannot find $Lib/$RUN_JAR jar"
			fi
			echo "specify running：${RUN_JAR}"
		else
			RUN_JAR=$(find "${Lib}" -type f -name "*.jar" -exec ls -t {} + | head -1 | sed 's#.*/##')
			# error
			if [[ -z "${RUN_JAR}" ]]; then
				errorExit "Jar not found"
			fi
			echo "automatic running：${RUN_JAR}"
		fi
	fi
}
```

#### windows 环境 💻

根据上述描述可以发现我们并未修改项目控制台日志路径，和整体描述不一致。

因为如果您仅在 Linux 环境运行上述推荐实现以及完全 OK ，但是如果您需要在 Windows 环境运行，那么您需要修改控制台日志路径（**Jpom 是兼容 Linux、Windows 环境的**）。

Windows 下假设定义如下变量：

```bash
set log_dir=%ENV_PATH%\..\logs
set Lib=%ENV_PATH%\..\lib\
set "RUN_JAR="
set stdout_log="%log_dir%\stdout.log"
```

Jpom 中的实现函数截取示例（Windows）：

```bash
@REM get jar
:listDir
	if "%RUN_JAR%"=="" (
		if exist "%Lib%\run.bin" (
			set /P RUN_JAR=<"%Lib%\run.bin"
			set JAR_MSG=specify running !RUN_JAR!
		)else (
			for /f "delims=" %%I in ('dir /B %Lib%') do (
				if exist %Lib%%%I if not exist %Lib%%%I\nul (
					if "%%~xI" ==".jar" (
						if "%RUN_JAR%"=="" (
							set "RUN_JAR=%%I"
						)
					)
				)
			)
			set JAR_MSG=auto running !RUN_JAR!
		)
	)else (
		set JAR_MSG=specify2 running %RUN_JAR%
	)
	if not exist %Lib%!RUN_JAR! (
	 	echo %JAR_MSG%
		echo file not exist %Lib%!RUN_JAR!
		PAUSE
		EXIT -1
	)
	@REM stdout_log
	if exist "%Lib%\run.bin" (
		set /P RUN_LOG=<"%Lib%\run.log"
		set stdout_log="%log_dir%\!RUN_LOG!"
	)
goto:eof
```

> 标记文件存放位置根据自己的喜好包目录结构存储即可没有特殊要求（建议存储在脚本或者程序包同级目录下）

Jpom 管理脚本完整参考：

- linux：[https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/bin/Server.sh](https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/bin/Server.sh)
- windows：[https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/bin/Server.bat](https://gitee.com/dromara/Jpom/blob/master/modules/server/src/main/bin/Server.bat)

### 代码细节 ⁉

我们在开发升级业务的时候我们需要考虑一些细节，根据 Jpom 的经验如下：

1. 执行脚本的方式（难点）
2. 考虑注册为服务（非必要）
3. 异步执行升级脚本（用户体验）

通常我们执行项目重启命令为：

`bash /xxxx/xxxx.sh restart` or `bash /xxxx/xxxx.bat restart`

如果注册为服务执行重启命令为：

`systemctl restart xxxxx.service`

#### 执行脚本的方式 🤔

在 java 中我们通常使用 `Runtime.getRuntime().exec(command)`来执行命令，但是这种方式在升级流程不适用，因为这里涉及到父进程和子进程的相关知识。

因为 java 默认执行脚本的标准输出目标是：`ProcessBuilder.Redirect.PIPE`

**PIPE**：表示子进程的 I/O 源或目标将与当前进程的 I/O 源或目标相同。 这是大多数操作系统命令解释器（shell）的正常行为。

这样当您执行重启当前项目的脚本时候，自身进程已经关闭，子进程也将自动关闭这样就无法实现自己重启自己。

所以我们需要将标准输出目标设置为：`ProcessBuilder.Redirect.INHERIT`

**INHERIT**：指示子进程 I/O 将通过管道连接到当前 Java 进程。 这是子进程标准 I/O 的默认处理。

这样就可以达到执行重启脚本时候，创建的子进程不受父进程影响。

参考代码：

```java
public static void asyncExeLocalCommand(String command, File file, Map<String, String> env, boolean useSudo) throws Exception {
    String newCommand = StrUtil.replace(command, StrUtil.CRLF, StrUtil.SPACE);
    newCommand = StrUtil.replace(newCommand, StrUtil.LF, StrUtil.SPACE);
    if (useSudo) {
        newCommand = StrUtil.addPrefixIfNot(newCommand, "sudo ");
    }
    //
    log.debug(newCommand);
    List<String> commands = getCommand();
    commands.add(newCommand);
    ProcessBuilder pb = new ProcessBuilder(commands);
    if (file != null) {
        pb.directory(file);
    }
    Map<String, String> environment = pb.environment();
    if (env != null) {
        environment.putAll(env);
    }
    pb.redirectOutput(ProcessBuilder.Redirect.INHERIT);
    pb.redirectError(ProcessBuilder.Redirect.INHERIT);
    pb.redirectInput(ProcessBuilder.Redirect.INHERIT);
    pb.start();
}
```

 这样设置后 java 程序里面无法直接知道执行命令的结果，需要采用获取当前项目是否在运行的方式来判断执行是否成功。
 
- 执行前后进程 ID 一致：表示脚本没有正确执行
- 执行前后进程 ID 不一致：表示项目重启成功，需要人工判断是否升级成功
- 执行后没有新进程：表示项目启动失败

> 提醒：Jpom 目前仅判断了项目进程是否存在，并未判断前后进程是否一致


#### 注册为服务 🎛

假设您的项目支持使用服务的方式启动，此时我们在代码里面就需要考虑使用重启服务的命令来重启项目，而不是直接使用 bash 来重启。

我们建议您将服务名注入到环境变量中，在执行重启时候判断是否存在环境变量，如果存在则使用服务方式来重启，否则使用 bash 方式来重启。

服务的方式又需要考虑是否需要使用 sudo 来执行命令，服务一般是需要 root 权限（这块建议自行根据业务评估实现）


Jpom 中实现代码参考：

```java
public static void restart() {
    File runFile = JpomManifest.getRunPath();
    File runPath = runFile.getParentFile();
    if (!runPath.isDirectory()) {
        throw new JpomRuntimeException(runPath.getAbsolutePath() + " error");
    }
    OsInfo osInfo = SystemUtil.getOsInfo();
    if (osInfo.isWindows()) {
        // 需要重新变更 stdout_log 文件来保证进程不被占用
        String format = StrUtil.format("stdout_{}.log", System.currentTimeMillis());
        FileUtil.writeString(format, FileUtil.file(runPath, "run.log"), CharsetUtil.CHARSET_UTF_8);
    }
    File scriptFile = JpomManifest.getScriptFile();
    ThreadUtil.execute(() -> {
        // Waiting for method caller,For example, the interface response
        ThreadUtil.sleep(2, TimeUnit.SECONDS);
        try {
            String command = CommandUtil.generateCommand(scriptFile, "restart upgrade");
            File parentFile = scriptFile.getParentFile();
            if (osInfo.isWindows()) {
                //String result = CommandUtil.execSystemCommand(command, scriptFile.getParentFile());
                //log.debug("windows restart {}", result);
                CommandUtil.asyncExeLocalCommand("start /b" + command, parentFile);
            } else {
                String jpomService = SystemUtil.get("JPOM_SERVICE");
                if (StrUtil.isEmpty(jpomService)) {
                    CommandUtil.asyncExeLocalCommand(command, parentFile);
                } else {
                    // 使用了服务
                    CommandUtil.asyncExeLocalCommand("systemctl restart " + jpomService, parentFile, null, true);
                }
            }
        } catch (Exception e) {
            log.error("重启自身异常", e);
        }
    });
}
```

#### 异步执行 ⛓

通常我们在调用重启方法是通过接口（Controller）来实现，这样如果不异步线程执行那么请求此接口将无法等待到任何响应就开始执行重启流程，这样给用户的体验就不知道是否开始执行重启，会误解为后台一直卡住。

建议：前端在收到此接口相应后可以开启一个全屏遮罩层，并轮询一个特定接口来判断新的服务是否启动成功。

#### 功能扩展 🎬

有来上述方案和流程后就是如何实现业务功能，您在开发业务时候需要考虑如何更新新程序包：

- 在线下载
- 手动上传

**在线下载**：要您提供一个版本检测接口和程序包下载服务，
程序定时（每天凌晨或者中午）请求一次版本信息接口与当前运行中的版本比较，
如果有新版本您可以做弹窗提醒、特定页面查看（Jpom 使用此方法）、自动下载并升级（不建议）

**手动上传**：如果您没有办法提供一个检测接口、下载服务、网络限制您只能使用手动上传的方式来更新程序包，java 程序实现上传这个功能非常通用。

> 在线下载或者手动上传需要自行实现将对应的程序包存放于程序的运行 lib 路径

**不兼容升级**：软件的不同版本迭代会因为功能变动、依赖升级等造成无法平滑升级的情况是时有发生的，此时您在开发业务时候就需要考虑到更新程序包时候判断当前运行的版本和要更新的新版本是否支持平滑升级，如果不支持平滑升级则提醒用户需要手动处理升级并告知操作流程。

在 Jpom 实践中出现过 2 次不兼容升级：

1. [v2.8.x 升级到 v.2.9.x](https://jpom.top/pages/upgrade/2.8.x-to-2.9.x/)
2. [v2.9.x 升级到 v.2.10.x](https://jpom.top/pages/upgrade/2.9.x-to-2.10.x/)


> 如果您对如何完整的实现升级业务逻辑还有疑问，欢迎加入 [Jpom 社群](https://jpom.top/pages/praise/join/)来交流。

## 写在最后 🙏

感谢您耐心阅读本文，希望本文能给您带来一定的价值。

如果觉得本文对您有帮助，请点个“赞”/“在看”支持一下，谢谢。

如您对本文有`任何疑问`、`不足之处`欢迎您加入 [Jpom 社群](https://jpom.top/pages/praise/join/)来交流，对本方案有更好的调优建议我们也非常欢迎您指出。

本文首发于 [Jpom 官方](https://jpom.top/) 欢迎访问，如需转载请先[联系作者](https://gitee.com/bwcx-jzy)。

## Jpom 链接 ✈

官网：[https://jpom.top/](https://jpom.top/)

Gitee: [https://gitee.com/dromara/Jpom](https://gitee.com/dromara/Jpom)

Github: [https://github.com/dromara/Jpom](https://github.com/dromara/Jpom)

加入社群：[https://jpom.top/pages/praise/join/](https://jpom.top/pages/praise/join/)