package co.edu.sena.domain;

import java.util.UUID;

public class LogErrorTestSamples {

    public static LogError getLogErrorSample1() {
        return new LogError().id("id1").levelError("levelError1").logName("logName1").messageError("messageError1");
    }

    public static LogError getLogErrorSample2() {
        return new LogError().id("id2").levelError("levelError2").logName("logName2").messageError("messageError2");
    }

    public static LogError getLogErrorRandomSampleGenerator() {
        return new LogError()
            .id(UUID.randomUUID().toString())
            .levelError(UUID.randomUUID().toString())
            .logName(UUID.randomUUID().toString())
            .messageError(UUID.randomUUID().toString());
    }
}
