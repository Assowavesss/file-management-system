if(PROJECT_NAME)
  macro(${PROJECT_NAME}_enable_target_format SOURCE_FILES)
    find_program(CLANG_FORMAT clang-format)
    if(CLANG_FORMAT)
      add_custom_target(
        format
        COMMAND ${CLANG_FORMAT}
          -i
          --verbose
          ${ALL_SOURCE_FILES}
        COMMENT
          "format all the source file of ${PROJECT_NAME} with ${CLANG_FORMAT}"
      )
    else()
      message(STATUS "clang-format requested but executable not found")
    endif()
  endmacro()
else()
  message(SEND_ERROR "Project not found")
endif()
