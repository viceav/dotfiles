#!/usr/bin/bash
xhost +SI:localuser:lutris
pactl load-module module-native-protocol-tcp auth-anonymous=127.0.0.1 port=4713
ip=$(ip addr | rg '[\d]+\.[\d]+\.[\d]+\.[\d].*wlo1' | awk '{print $2}' | cut -d '/' -f 1)
sudo -u lutris env LUTRIS_SKIP_INIT=1 PULSE_SERVER=$ip lutris lutris:rungameid/2 && \
  pactl unload-module module-native-protocol-tcp && \
  xhost -SI:localuser:lutris
