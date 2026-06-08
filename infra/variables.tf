variable "aws_region" {
  type        = string
  description = "AWS region" 
  default     = "eu-west-1" # تم نقل القيمة إلى هنا
}

variable "vpc_cidr" {
  type        = string
  description = "VPC cidr"
  default     = "10.0.0.0/16" # تم نقل القيمة إلى هنا وإضافة علامات التنصيص
}

variable "vpc_name" {
  type        = string
  description = "VPC Name"
  default     = "my-main-vpc" # أضفنا قيمة افتراضية لاسم الـ VPC
}