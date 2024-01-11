if(PROJECT_NAME)
  macro(${PROJECT_NAME}_enable_target_lint SOURCE_FILES)
    find_program(CLANG_TIDY clang-tidy)
    if(CLANG_TIDY)
      add_custom_target(
        lint
        COMMAND 
            ${CLANG_TIDY} 
            -p ${CMAKE_BINARY_DIR} 
          ${ALL_SOURCE_FILES}
        COMMENT
          "lint all the source file of ${PROJECT_NAME} with ${CLANG_TIDY}"
      )
    else()
      message(STATUS "clang-format requested but executable not found")
    endif()
  endmacro()
else()
  message(SEND_ERROR "Project not found")
endif()
