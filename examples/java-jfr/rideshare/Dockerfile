FROM openjdk:11-slim-bullseye

WORKDIR /opt/app

RUN apt-get update && apt-get install ca-certificates -y && update-ca-certificates && apt-get install -y git wget

# ADD https://github.com/pyroscope-io/pyroscope-java/releases/download/v0.8.0/pyroscope.jar /opt/app/pyroscope.jar
RUN mkdir -p /opt/cprof && \
	wget -q -O- https://storage.googleapis.com/cloud-profiler/java/latest/profiler_java_agent.tar.gz \
	| tar xzv -C /opt/cprof

COPY gradlew .
COPY gradle gradle
RUN ./gradlew

COPY build.gradle.kts settings.gradle.kts ./
COPY src src
RUN ./gradlew assemble --no-daemon

ENV PYROSCOPE_APPLICATION_NAME=rideshare.java.push.app
ENV PYROSCOPE_FORMAT=jfr
ENV PYROSCOPE_PROFILING_INTERVAL=10ms
ENV PYROSCOPE_PROFILER_EVENT=itimer
ENV PYROSCOPE_PROFILER_LOCK=1
ENV PYROSCOPE_PROFILER_ALLOC=100k
ENV PYROSCOPE_UPLOAD_INTERVAL=10s
ENV PYROSCOPE_LOG_LEVEL=debug
ENV PYROSCOPE_SERVER_ADDRESS=http://localhost:4040

# CMD ["java", "-javaagent:pyroscope.jar", "-jar", "./build/libs/rideshare-1.0-SNAPSHOT.jar"]
CMD ["java", \
	"-agentpath:/opt/cprof/profiler_java_agent.so=-cprof_service=rideshare,-cprof_service_version=2.0.0,-cprof_enable_heap_sampling=true,-logtostderr", \
	"-jar", "./build/libs/rideshare-1.0-SNAPSHOT.jar"]
