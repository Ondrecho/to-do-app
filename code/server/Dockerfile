FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY build/libs/*.jar app.jar
EXPOSE 5001
ENTRYPOINT ["java","-jar","/app/app.jar"]
