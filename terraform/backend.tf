terraform {
  backend "s3" {
    bucket  = "remotebackend"
    key     = "radlibs/terraform.tfstate"
    region  = "us-west-1"
    profile = "jds"
  }
}
