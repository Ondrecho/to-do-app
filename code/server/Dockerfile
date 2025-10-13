# Multi-stage build: build the Spring Boot jar with Gradle, then copy to a slim runtime image
FROM gradle:8.4-jdk17 as builder
WORKDIR /home/gradle/project
# copy sources and gradle wrapper
COPY --chown=gradle:gradle . .
# build the bootJar (creates build/libs/*.jar)
RUN gradle bootJar --no-daemon --warning-mode=none

FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# Copy jar produced by the builder stage
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar
EXPOSE 5001
ENTRYPOINT ["java","-jar","/app/app.jar"]
