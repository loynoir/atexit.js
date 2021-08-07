MAKEFLAGS += --silent
.ONESHELL:
.SHELLFLAGS += -ex

all:
	pnpm run build
	# pnpm run examples
