FROM maven:3.6.0-jdk-11-slim AS build
COPY src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package

FROM openjdk:11 
COPY --from=build /app/target/WebTiengAnh-0.0.1-SNAPSHOT.jar WebTiengAnh-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","WebTiengAnh-0.0.1-SNAPSHOT.jar"]