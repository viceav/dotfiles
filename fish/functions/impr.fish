function impr
  set error "Usage: impr <pdf> [<pdf> ...]"

  if test (count $argv) -eq 0
    echo $error
    return 1
  end

  for file in $argv
    set filetype $(xdg-mime query filetype $file)
    if not string match $filetype "application/pdf" > /dev/null
      echo $error
      echo $file should be a pdf file
      return 1
    end
  end

  eval (ssh-agent -c)
  ssh-add
  scp $argv $IMPR_DEST:~
  ssh $IMPR_DEST 'for i in $(ls *.pdf); do pdf2ps $i output.ps && duplex output.ps | lpr -P hp; done && rm *.pdf output.ps'
  ssh-agent -k
end
