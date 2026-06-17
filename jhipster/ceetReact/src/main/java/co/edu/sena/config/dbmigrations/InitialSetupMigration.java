package co.edu.sena.config.dbmigrations;

import co.edu.sena.config.Constants;
import co.edu.sena.domain.Authority;
import co.edu.sena.domain.User;
import co.edu.sena.security.AuthoritiesConstants;
import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;
import java.time.Instant;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 * Creates the initial database setup.
 */
@ChangeUnit(id = "users-initialization", order = "001")
public class InitialSetupMigration {

    private final MongoTemplate template;

    public InitialSetupMigration(MongoTemplate template) {
        this.template = template;
    }

    @Execution
    public void changeSet() {
        Authority userAuthority = createUserAuthority();
        userAuthority = template.save(userAuthority);
        Authority adminAuthority = createAdminAuthority();
        adminAuthority = template.save(adminAuthority);
        Authority intructorAuthority = createInstructorAuthority();
        intructorAuthority = template.save(intructorAuthority);
        Authority coordinadorAuthority = createCoordinadorAuthority();
        coordinadorAuthority = template.save(coordinadorAuthority);
        addUsers(userAuthority, adminAuthority, intructorAuthority, coordinadorAuthority);
    }

    @RollbackExecution
    public void rollback() {}

    private Authority createAuthority(String authority) {
        Authority adminAuthority = new Authority();
        adminAuthority.setName(authority);
        return adminAuthority;
    }

    private Authority createAdminAuthority() {
        Authority adminAuthority = createAuthority(AuthoritiesConstants.ADMIN);
        return adminAuthority;
    }

    private Authority createUserAuthority() {
        Authority userAuthority = createAuthority(AuthoritiesConstants.USER);
        return userAuthority;
    }
    private Authority createInstructorAuthority() {
        Authority instructorAuthority = createAuthority(AuthoritiesConstants.INSTRUCTOR);
        return instructorAuthority;
    }


    private Authority createCoordinadorAuthority() {
        Authority coordinadorAuthority = createAuthority(AuthoritiesConstants.COORDINADOR);
        return coordinadorAuthority;
    }

    private void addUsers(Authority userAuthority, Authority adminAuthority, Authority instructorAuthority, Authority coordinadorAuthority) {
        User user = createUser(userAuthority);
        template.save(user);
        User admin = createAdmin(adminAuthority, userAuthority);
        template.save(admin);
        User instructor = createInstructor(instructorAuthority, userAuthority);
        template.save(instructor);
        User coordinador = createCoordinador(coordinadorAuthority, userAuthority);
        template.save(coordinador);
    }

    private User createUser(Authority userAuthority) {
        User userUser = new User();
        userUser.setLogin("user");
        userUser.setPassword("$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K");
        userUser.setEmail("user@localhost");
        userUser.setActivated(true);
        userUser.setLangKey("es");
        userUser.setCreatedBy(Constants.SYSTEM);
        userUser.setCreatedDate(Instant.now());
        userUser.getAuthorities().add(userAuthority);
        return userUser;
    }

    private User createAdmin(Authority adminAuthority, Authority userAuthority) {
        User adminUser = new User();
        adminUser.setLogin("admin");
        adminUser.setPassword("$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC");
        adminUser.setEmail("admin@localhost");
        adminUser.setActivated(true);
        adminUser.setLangKey("es");
        adminUser.setCreatedBy(Constants.SYSTEM);
        adminUser.setCreatedDate(Instant.now());
        adminUser.getAuthorities().add(adminAuthority);
        adminUser.getAuthorities().add(userAuthority);
        return adminUser;
    }

    private User createInstructor(Authority instructorAuthority, Authority userAuthority) {
        User instructorUser = new User();
        instructorUser.setLogin("instructor");
        instructorUser.setPassword("$2a$10$X4cedXhRHbXfrt/tdXbY7uuo8as7xn27isGkPdRO1s4QWNo0vOAw2");
        instructorUser.setEmail("instructor@localhost");
        instructorUser.setActivated(true);
        instructorUser.setLangKey("es");
        instructorUser.setCreatedBy(Constants.SYSTEM);
        instructorUser.setCreatedDate(Instant.now());
        instructorUser.getAuthorities().add(instructorAuthority);
        instructorUser.getAuthorities().add(userAuthority);
        return instructorUser;
    }

    private User createCoordinador(Authority coordinadorAuthority, Authority userAuthority) {
        User coordinadorUser = new User();
        coordinadorUser.setLogin("coordinador");
        coordinadorUser.setPassword("$2a$10$cJFUoVKaoCP3pXrzNz7EIePGQcHuVUWmPQOyY2e/VmBAoTlhVihJi");
        coordinadorUser.setEmail("coordinador@localhost");
        coordinadorUser.setActivated(true);
        coordinadorUser.setLangKey("es");
        coordinadorUser.setCreatedBy(Constants.SYSTEM);
        coordinadorUser.setCreatedDate(Instant.now());
        coordinadorUser.getAuthorities().add(coordinadorAuthority);
        coordinadorUser.getAuthorities().add(userAuthority);
        return coordinadorUser;
    }
}
