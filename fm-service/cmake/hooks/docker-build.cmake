if(PROJECT_NAME)
  macro(${PROJECT_NAME}_enable_target_docker_build DOCKER_ID DOCKER_REPO DOCKER_TAG)
    find_program(DOCKER docker)
    if(DOCKER)
      add_custom_target(
        docker-build
        COMMAND
          ${DOCKER} build -t "${DOCKER_ID}/${DOCKER_REPO}:${DOCKER_TAG}" ${PROJECT_SOURCE_DIR} 
        COMMENT
          "build ${DOCKER_ID}/${DOCKER_REPO}:${DOCKER_TAG} as image"
      )
    else()
      message(STATUS "docker requested but executable not found")
    endif()
  endmacro()
else()
  message(SEND_ERROR "Project not found")
endif()
