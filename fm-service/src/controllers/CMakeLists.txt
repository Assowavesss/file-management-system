cmake_minimum_required(VERSION 3.5)

# Puts source files here
set(CTRL_SOURCES 
    ${CMAKE_CURRENT_SOURCE_DIR}/AccountCtrl.cc
)

# Puts header files here
set(CTRL_HEADERS 
    ${CMAKE_CURRENT_SOURCE_DIR}/AccountCtrl.h
)

target_sources(${PROJECT_NAME}
	       PRIVATE
	       ${CTRL_SOURCES}
	       ${CTRL_HEADERS} # for VS integration
)      		