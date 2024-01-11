if(PROJECT_NAME)
  macro(${PROJECT_NAME}_enable_target_docker_push DOCKER_ID DOCKER_REPO DOCKER_TAG)
    find_program(DOCKER docker)
    if(DOCKER)
      add_custom_target(
        docker-push
        COMMAND
          ${DOCKER} push "${DOCKER_ID}/${DOCKER_REPO}:${DOCKER_TAG}" 
        COMMENT
          "push ${DOCKER_ID}/${DOCKER_REPO}:${DOCKER_TAG} on dockerhub"
      )
    else()
      message(STATUS "docker requested but executable not found")
    endif()
  endmacro()
else()
  message(SEND_ERROR "Project not found")
endif()
