variable "aws_region" {
  type        = string
  description = "المنطقة اللي هنبني فيها اللاب في AWS"
}

variable "project_name" {
  type        = string
  description = "اسم المشروع اللي هيتكتب في التاجز لتنظيم الموارد"
}

variable "vpc_cidr" {
  type        = string
  description = "نطاق الآي بي الخاص بالشبكة الكبيرة VPC"
}

variable "public_subnets" {
  type        = list(string)
  description = "قائمة بنطاقات الآي بي للـ Subnets العامة"
}

variable "availability_zones" {
  type        = list(string)
  description = "قائمة بمناطق التوفر داخل الريجون"
}
variable "instance_type" {
  type        = string
  description = "حجم السيرفر الصغير اللي هيشتغل جوة الأوتو سكيلنج"
  default     = "t2.micro"
}

variable "server_port" {
  type        = number
  description = "البورت اللي السيرفرات والـ Load Balancer هيسمعوا عليه (HTTP)"
  default     = 80
}

variable "vpc_name" {
  description = "VPC 1"
  type        = string
}