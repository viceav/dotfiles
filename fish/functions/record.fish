function record
  switch $argv[1]
    case '-a'
      set -f audio '-a '(pactl get-default-sink)'.monitor'
  end
  wf-recorder -c libx264rgb $audio
end
