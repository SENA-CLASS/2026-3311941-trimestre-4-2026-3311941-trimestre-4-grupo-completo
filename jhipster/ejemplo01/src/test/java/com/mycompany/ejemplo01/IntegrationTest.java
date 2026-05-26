package com.mycompany.ejemplo01;

import com.mycompany.ejemplo01.config.AsyncSyncConfiguration;
import com.mycompany.ejemplo01.config.JacksonConfiguration;
import com.mycompany.ejemplo01.config.MongoDbTestContainer;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.context.ImportTestcontainers;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { Ejemplo01App.class, JacksonConfiguration.class, AsyncSyncConfiguration.class })
@ImportTestcontainers(MongoDbTestContainer.class)
public @interface IntegrationTest {}
