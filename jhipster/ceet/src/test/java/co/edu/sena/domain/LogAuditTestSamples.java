package co.edu.sena.domain;

import java.util.UUID;

public class LogAuditTestSamples {

    public static LogAudit getLogAuditSample1() {
        return new LogAudit().id("id1").levelAudit("levelAudit1").logName("logName1").messageAudit("messageAudit1");
    }

    public static LogAudit getLogAuditSample2() {
        return new LogAudit().id("id2").levelAudit("levelAudit2").logName("logName2").messageAudit("messageAudit2");
    }

    public static LogAudit getLogAuditRandomSampleGenerator() {
        return new LogAudit()
            .id(UUID.randomUUID().toString())
            .levelAudit(UUID.randomUUID().toString())
            .logName(UUID.randomUUID().toString())
            .messageAudit(UUID.randomUUID().toString());
    }
}
