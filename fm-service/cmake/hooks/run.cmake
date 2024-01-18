if(PROJECT_NAME)
  macro(${PROJECT_NAME}_enable_target_run)
      add_custom_target(
        run-${PROJECT_NAME}
        COMMAND
          $<TARGET_FILE:${PROJECT_NAME}>
        DEPENDS
          ${PROJECT_NAME}
        COMMENT
          "Run ${PROJECT_NAME} target"
      )
  endmacro()
else()
  message(SEND_ERROR "Project not found")
endif()
