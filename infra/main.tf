# 1. Internet Gateway (بوابة الإنترنت ربطاً بالـ VPC)
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.vpc_name}-igw"
  }
}

# 2. Public Subnet (الشبكة الفرعية)
resource "aws_subnet" "public_subnet" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24" # يمكنكِ أيضاً تحويلها لمتغير إذا أردتِ
  map_public_ip_on_launch = true          # ليعطي الـ EC2 آي بي عام تلقائياً

  tags = {
    Name = "${var.vpc_name}-public-subnet"
  }
}

# 3. Route Table (جدول التوجيه لتوجيه الترافيك للإنترنت عبر الـ IGW)
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0" # كل الترافيك المتجه للإنترنت
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.vpc_name}-public-rt"
  }
}

# 4. Route Table Association (ربط جدول التوجيه بالـ Subnet)
resource "aws_route_table_association" "public_assoc" {
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public_rt.id
}

# 5. Security Group (مجموعة الأمان للسماح بالاتصال بالـ EC2 - اختياري ولكنه مهم جداً للـ EC2)
resource "aws_security_group" "web_sg" {
  name        = "allow_web_traffic"
  description = "Allow SSH and HTTP traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "SSH from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tc"
  }
}

resource "aws_instance" "web_server" {
  ami           = dat.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public_subnet.id
  
  vpc_security_group_ids = [aws_security_group.web_sg.id]
  user_id   =  file("init-script.sh")
  tags = {
    Name = "${var.vpc_name}-web-server"
  }
}