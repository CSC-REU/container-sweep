# container-sweep

### Examples

```shell
container-sweep kill "* * * * *"

container-sweep kill --name "*" --age 0 "* * * * *"

container-sweep kill --name "alpine" --age 180 "* * * * *"
```
