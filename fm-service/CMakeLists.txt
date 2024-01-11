cmake_minimum_required(VERSION 3.11)

include(cmake/project-settings.cmake)


project(AccountService 
	VERSION 1.0.0
	DESCRIPTION "Account service"
	LANGUAGES CXX
)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(UTIL_DIR ${PROJECT_SOURCE_DIR}/utils)

#include(cmake/static-analyzers.cmake)
#AccountService_enable_lint()

add_subdirectory(src)

file(GLOB_RECURSE ALL_SOURCE_FILES *.cc *.h)
foreach (SOURCE_FILE ${ALL_SOURCE_FILES})
  string(FIND ${SOURCE_FILE} ${THIRDPARTY_DIR} THIRDPARTY_DIR_FOUND)
  if (NOT ${THIRDPARTY_DIR_FOUND} EQUAL -1)
    list(REMOVE_ITEM ALL_SOURCE_FILES ${SOURCE_FILE})
  endif()
endforeach()

include(cmake/hooks/format.cmake)
AccountService_enable_target_format(${ALL_SOURCE_FILES})

include(cmake/hooks/lint.cmake)
AccountService_enable_target_lint(${ALL_SOURCE_FILES})

include(cmake/hooks/docker-build.cmake)
AccountService_enable_target_docker_build(${DOCKER_ID} ${DOCKER_REPO} ${DOCKER_TAG})

include(cmake/hooks/docker-push.cmake)
AccountService_enable_target_docker_push(${DOCKER_ID} ${DOCKER_REPO} ${DOCKER_TAG})
